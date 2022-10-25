import { QueryMetadata } from "../../../types";

export const Metadata = ({ metadata }: { metadata: QueryMetadata }) => {
  const flattened = {
    ...metadata.operation,
    ...metadata.result,
    ...metadata.request,
  };
  return (
    <div className="grid gap-4 grid-flow-row p-4 text-sm">
      {Object.keys(flattened).map((metadataKey) => {
        return (
          <div
            className="grid grid-cols-5 border-b border-gray-300 pb-1 max-h-6 content-center "
            key={metadataKey}
          >
            <div className="col-span-1 text-gray-500 font-semibold">
              {metadataKey}
            </div>
            <div className="col-span-3 overflow-auto text-gray-500 ">
              {flattened[metadataKey as keyof typeof flattened]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
