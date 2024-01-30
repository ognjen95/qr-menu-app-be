import { Args, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { FileService } from '../../../application/services/files/file-upload.service';

@ObjectType()
export class PresignedUrlReturn {
  @Field()
  link: string;

  @Field()
  id: string;
}

@Resolver()
export class FilesResolver {
  constructor(private readonly fileService: FileService) { }

  @Query(() => [PresignedUrlReturn], { nullable: 'items' })
  async presignedUrl(
    @Args('fileNames', {
      type: () => [String],
    })
    fileNames: string[],
  ) {
    return await this.fileService.getPresignedUrls(fileNames);
  }
}
