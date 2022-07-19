import type UploadFile from 'schemas/UploadFile'
import type Cloudinary from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import * as jf from 'joiful'
import CloudinaryResponseError from 'schemas/CloudinaryResponseError'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export interface OutputImage {
  url: string
  publicId: string
  width: number
  height: number
}

export const uploadImage = async (
  userFolder: string,
  file: UploadFile
): Promise<OutputImage> => {
  const response = await cloudinary.uploader.upload(file.filepath, {
    resource_type: 'image',
    format: 'webp',
    folder: `${process.env.CLOUDINARY_MEDIA_FOLDER}/${userFolder}`,
    tags: [userFolder],
    quality: 60,
  })

  return {
    url: response.secure_url,
    publicId: response.public_id,
    width: response.width,
    height: response.height,
  }
}

export interface OutputProfileImage {
  url: string
  publicId: string
}

export const uploadProfileImage = async (
  userFolder: string,
  file: UploadFile,
  publicId?: 'avatar' | 'cover'
): Promise<OutputProfileImage> => {
  const options: Cloudinary.UploadApiOptions = {
    resource_type: 'image',
    format: 'webp',
    public_id: publicId,
    folder: `${process.env.CLOUDINARY_MEDIA_FOLDER}/${userFolder}`,
    tags: [userFolder],
    overwrite: true,
    quality: 60,
  }

  if (publicId === 'avatar') {
    options.width = 400
    options.height = 400
    options.crop = 'fill'
    options.gravity = 'auto'
  }

  const response = await cloudinary.uploader.upload(file.filepath, options)

  return {
    url: response.secure_url,
    publicId: response.public_id,
  }
}

export const deleteResource = (publicId: string) =>
  cloudinary.uploader.destroy(publicId)

export const deleteFolder = async (folder: string) => {
  await cloudinary.api.delete_resources_by_tag(folder)

  try {
    await cloudinary.api.delete_folder(
      `${process.env.CLOUDINARY_MEDIA_FOLDER}/${folder}`
    )
  } catch (error: any) {
    const { error: validationError, value } = jf.validateAsClass(
      error,
      CloudinaryResponseError
    )

    if (validationError) throw error
    if (!value.error.message.startsWith("Can't find folder")) throw error
  }
}
