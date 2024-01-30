import { Module } from '@nestjs/common';
import { FilesResolver } from '../resolvers/files/files.resolver';
import { FileService } from '../../application/services/files/file-upload.service';

@Module({
  imports: [],
  providers: [FilesResolver, FileService],
})
export class FilesModule {}
