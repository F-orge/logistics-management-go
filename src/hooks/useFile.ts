import { useQuery } from '@tanstack/react-query';

export const useFiles = (links: (string | undefined)[]) => {
  const query = useQuery({
    queryKey: ['files', links],
    queryFn: async () => {
      try {
        const fileData = await Promise.all(
          links.map(async (link) => {
            if (!link) return null;
            const response = await fetch(link);
            const blob = await response.blob();
            const fileName = link.substring(link.lastIndexOf('/') + 1);
            return {
              fileName: fileName,
              blob: blob,
              metadata: {
                type: blob.type,
              },
            };
          }),
        );

        const files = fileData
          .filter((v) => v !== null)
          .map(
            (data) =>
              new File([data.blob], data.fileName, {
                type: data.metadata.type,
              }),
          );

        return files;
      } catch (error) {
        console.error('Failed to fetch files:', error);
        throw error;
      }
    },
    enabled: links.every((link) => link !== undefined),
  });

  return query;
};
