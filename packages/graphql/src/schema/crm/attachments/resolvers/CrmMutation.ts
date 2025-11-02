import { GraphQLError } from "graphql";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
	CrmMutationResolvers,
	"createAttachment" | "removeAttachment"
> = {
	createAttachment: (parent, args, ctx) => {
		if (args.value.file instanceof File) {
			// save this to file system

			return {} as any;
		} else {
			throw new GraphQLError("value.file is not a file");
		}
	},
};
