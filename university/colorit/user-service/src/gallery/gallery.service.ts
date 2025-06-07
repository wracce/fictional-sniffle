import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data: Partial<Gallery>): Promise<GalleryDocument> {
    return this.galleryModel.create(data);
  }

  async findAll(): Promise<GalleryDocument[]> {
    return this.galleryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<GalleryDocument | null> {
    return this.galleryModel.findById(id).exec();
  }

  async findOne(id: string): Promise<GalleryDocument | null> {
    return this.galleryModel.findById(id).exec();
  }

  async updateById(
    id: string,
    updates: Partial<Gallery>,
  ): Promise<GalleryDocument | null> {
    return this.galleryModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async findByUuid(uuid: string): Promise<GalleryDocument | null> {
    return this.galleryModel.findOne({ uuid }).exec();
  }

  async findPublicPaginated(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.galleryModel
        .find({ public: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author')
        .exec(),

      this.galleryModel.countDocuments({ public: true }),
    ]);

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findUserPaginated(userId: string, page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.galleryModel
        .find({ author: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author')
        .exec(),

      this.galleryModel.countDocuments({ author: userId }),
    ]);

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async deleteById(id: string): Promise<void> {
    await this.galleryModel.findByIdAndDelete(id);
  }

  async getUserStats(userId: string) {
    const items = await this.galleryModel.find({ author: userId });

    const totalColorized = items.length;
    const averageRating =
      items.length > 0
        ? items.reduce((sum, item) => sum + item.rating, 0) / items.length
        : 0;
    const averageProcessingTime =
      items.length > 0
        ? items.reduce((sum, item) => sum + item.processingTime, 0) / items.length
        : 0;

    const userDoc = await this.userModel.findById(userId).lean();
    const memberSince = userDoc?.createdAt || new Date();

    return {
      totalColorized,
      averageRating: +averageRating.toFixed(1),
      averageProcessingTime: +averageProcessingTime.toFixed(1),
      memberSince,
    };
  }
}
