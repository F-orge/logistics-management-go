import { access, stat as fsStat, readdir, unlink } from 'node:fs/promises';
import { BillingDocumentTypeEnum, CrmRecordType } from '@/db/types';

// Custom error classes
export class FileNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileNotFoundError';
  }
}

export class PermissionDeniedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionDeniedError';
  }
}

export interface BunStorageRepositoryOptions {
  path?: string;
}

export class BunStorageRepository {
  private path: string;

  getStoragePath(): string {
    return this.path;
  }

  constructor(optionsOrPath?: BunStorageRepositoryOptions | string) {
    if (typeof optionsOrPath === 'string') {
      this.path = optionsOrPath;
    } else if (
      optionsOrPath &&
      typeof optionsOrPath === 'object' &&
      optionsOrPath.path
    ) {
      this.path = optionsOrPath.path;
    } else {
      this.path = process.env.BUN_STORAGE_ROOT || './storage';
    }
  }

  async save(
    recordId: string,
    recordType: CrmRecordType | BillingDocumentTypeEnum,
    file: File,
  ) {
    return Bun.write(
      `${this.path}/${recordType}/${recordId}/${file.name}`,
      file,
    );
  }

  async get(
    recordId: string,
    recordType: CrmRecordType | BillingDocumentTypeEnum,
    name: string,
  ) {
    const filePath = `${this.path}/${recordType}/${recordId}/${name}`;
    try {
      // Bun.file does not throw, but we can check existence
      await access(filePath);
      return Bun.file(filePath);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new FileNotFoundError(`File not found: ${filePath}`);
      }
      if ((e as NodeJS.ErrnoException).code === 'EACCES') {
        throw new PermissionDeniedError(`Permission denied: ${filePath}`);
      }
      throw e;
    }
  }

  /**
   * List all files for a given recordId and recordType
   */
  async list(
    recordId: string,
    recordType: CrmRecordType | BillingDocumentTypeEnum,
  ): Promise<string[]> {
    const dir = `${this.path}/${recordType}/${recordId}`;
    try {
      return await readdir(dir);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return [];
      if ((e as NodeJS.ErrnoException).code === 'EACCES') {
        throw new PermissionDeniedError(`Permission denied: ${dir}`);
      }
      throw e;
    }
  }

  /**
   * Delete a file for a given recordId, recordType, and file name
   */
  async delete(
    recordId: string,
    recordType: CrmRecordType | BillingDocumentTypeEnum,
    name: string,
  ): Promise<boolean> {
    const filePath = `${this.path}/${recordType}/${recordId}/${name}`;
    try {
      await unlink(filePath);
      return true;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return false;
      if ((e as NodeJS.ErrnoException).code === 'EACCES') {
        throw new PermissionDeniedError(`Permission denied: ${filePath}`);
      }
      throw e;
    }
  }

  /**
   * Check if a file exists for a given recordId, recordType, and file name
   */
  async exists(
    recordId: string,
    recordType: CrmRecordType | BillingDocumentTypeEnum,
    name: string,
  ): Promise<boolean> {
    const filePath = `${this.path}/${recordType}/${recordId}/${name}`;
    try {
      await access(filePath);
      return true;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return false;
      if ((e as NodeJS.ErrnoException).code === 'EACCES') {
        throw new PermissionDeniedError(`Permission denied: ${filePath}`);
      }
      throw e;
    }
  }
  /**
   * Get file metadata (size, mtime, etc.) for a given recordId, recordType, and file name
   */
  async stat(
    recordId: string,
    recordType: CrmRecordType,
    name: string,
  ): Promise<{ size: number; mtime: Date; ctime: Date; atime: Date }> {
    const filePath = `${this.path}/${recordType}/${recordId}/${name}`;
    try {
      const stats = await fsStat(filePath);
      return {
        size: stats.size,
        mtime: stats.mtime,
        ctime: stats.ctime,
        atime: stats.atime,
      };
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new FileNotFoundError(`File not found: ${filePath}`);
      }
      if ((e as NodeJS.ErrnoException).code === 'EACCES') {
        throw new PermissionDeniedError(`Permission denied: ${filePath}`);
      }
      throw e;
    }
  }
}
