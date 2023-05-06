const {
    Photo,
    User
    // ,Comment 
} = require('../models')

class photoController {

    static async getPhotos(req, res) {
        try {
            const { id } = req.UserData
            const response = await Photo.findAll({
                where: {
                    UserId: id
                },
                include: [
                    // {
                    //     model: Comment,
                    //     attributes: ['comment'],
                    //     include: {
                    //         model: User,
                    //         attributes: ['username']
                    //     }
                    // },
                    {
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url']
                    }
                ]
            })

            res.status(200).json(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }


    static async createPhoto(req, res) {
        try {
            const {
                poster_image_url,
                title,
                caption
            } = req.body

            const { id } = req.UserData

            const data = await Photo.create({
                poster_image_url,
                title,
                caption,
                UserId: id
            })

            const response = {
                id: data.id,
                poster_image_url: data.poster_image_url,
                title: data.title,
                caption: data.caption,
                UserId: data.UserId
            }
            res.status(201).json(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }


    static async updatePhotoById(req, res) {
        try {
            const photoId = req.params.photoId
            const { id: userId } = req.UserData

            const checkPhoto = await Photo.findOne({
                where: {
                    id: photoId
                }
            })

            // Verifikasi Account
            if (checkPhoto.UserId !== userId) {
                throw {
                    code: 403,
                    message: "You are forbidden to access this data!"
                }
            }

            const {
                title,
                caption,
                poster_image_url
            } = req.body

            const [rowCount, [data]] = await Photo.update({
                title,
                caption,
                poster_image_url
            }, {
                where: {
                    id: photoId
                },
                returning: true
            })

            if (rowCount === 0) {
                return res.status(404).json({ message: 'Photo not Found!' });
            }

            const response = {
                id: data.id,
                poster_image_url: data.poster_image_url,
                title: data.title,
                caption: data.caption,
                UserId: data.UserId,
                createdAt: Date(),
                updatedAt: Date()
            }

            res.status(200).json({ photo: data })
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }


    static async deletePhotoById(req, res) {

        try {
            const photoId = req.params.photoId
            const { id: userId } = req.UserData

            const checkPhoto = await Photo.findOne({
                where: {
                    id: photoId
                }
            })

            if (!checkPhoto) {
                throw {
                    code: 404,
                    message: "Photo not Found!"
                }
            }

            // Verifikasi Account
            if (checkPhoto.UserId !== userId) {
                throw {
                    code: 403,
                    message: "You are not allowed to access this data!"
                }
            }

            const response = await Photo.destroy({
                where: {
                    id: photoId
                }
            })

            // Kak ini kenapa gk bisa ya? Padahal pas dlu pertemuan latihan bisa. Alhasil pake yang ada diatas kak
            // if (!response) {
            //     throw {
            //         code: 404,
            //         message: "Photo not found!"
            //     }
            // }

            res.status(200).json({ message: "Your photo has been successfully deleted" })
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

}

module.exports = photoController