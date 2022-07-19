import type { NextApiRequest, NextApiResponse } from 'next'
import type UserSettings from 'types/user-settings'
import { getSession } from 'next-auth/react'
import * as jf from 'joiful'
import EditUser from 'schemas/EditUser'
import prisma from 'lib/db/prisma'
import parseFormData from 'lib/middlewares/parseFormData'
import {
  uploadProfileImage,
  deleteResource,
  deleteFolder,
  OutputProfileImage,
} from 'lib/db/media'
import getAvatar from 'utils/getAvatar'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<UserSettings | string>
) => {
  if (req.method !== 'POST' && req.method !== 'DELETE')
    return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  if (req.method === 'POST') {
    await parseFormData(req)

    const { error, value } = jf.validateAsClass(req.body, EditUser)

    if (error) return res.status(400).send(error.message)

    const { user } = session

    const { name, bio, defaultAvatar, removeCover, files } = value

    if (defaultAvatar && files.avatar)
      return res
        .status(400)
        .send("You can't set default avatar and upload avatar at the same time")

    if (removeCover && files.cover)
      return res
        .status(400)
        .send("You can't set remove cover and upload cover at the same time")

    let cover: OutputProfileImage | undefined
    let avatar: OutputProfileImage | undefined

    const userFolder = `${process.env.CLOUDINARY_MEDIA_FOLDER}/${user.id}`

    const deleteAvatar = async () => {
      if (!user.image.startsWith('https://res.cloudinary.com')) return

      return deleteResource(`${userFolder}/avatar`)
    }

    const deleteCover = async () => {
      const coverPublicId = `/cover`
      return deleteResource(coverPublicId)
    }

    try {
      const [avatarResult, coverResult] = await Promise.all([
        files.avatar && uploadProfileImage(user.id, files.avatar, 'avatar'),
        files.cover && uploadProfileImage(user.id, files.cover, 'cover'),
        defaultAvatar && !files.avatar && deleteAvatar(),
        removeCover && !files.cover && deleteCover(),
      ])

      avatar = avatarResult
      cover = coverResult

      const editedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
          bio,
          cover: removeCover ? null : cover?.url,
          image: defaultAvatar ? getAvatar(name || user.name) : avatar?.url,
        },
      })

      res.status(200).send({
        id: editedUser.id,
        name: editedUser.name,
        image: editedUser.image,
        cover: editedUser.cover,
        bio: editedUser.bio,
      })
    } catch (error) {
      cover && (await deleteResource(cover.publicId))
      avatar && (await deleteResource(avatar.publicId))

      console.error(error)
      res.status(500).send('Something went wrong')
    }

    return
  }

  try {
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    })

    // Delete user images if the user was successfully deleted
    await deleteFolder(session.user.id)

    return res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
