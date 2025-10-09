import { CrmRecordType } from '@/db/types';

export class BunStorageRepository {
  constructor(private path: string) {}

  async save(recordId: string, recordType: CrmRecordType, file: File) {
    return Bun.write(
      `${this.path}/${recordType}/${recordId}/${file.name}`,
      file,
    );
  }

  async get(recordId: string, recordType: CrmRecordType, name: string) {
    return Bun.file(`${this.path}/${recordType}/${recordId}/${name}`);
  }
}
