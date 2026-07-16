import { CheckIcon, TagIcon } from "./icons";

const CompletedTodoList = ({ completedTodo }) => {
  if (completedTodo.length === 0) return null;

  return (
    <>
      <div className="mb-4 mt-9 flex items-center gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-3">
          Done
        </h2>
        <span className="min-w-5 rounded-full border border-line bg-surface px-2 text-center text-[11.5px] font-semibold text-ink-3">
          {completedTodo.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {completedTodo.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-xl border border-line bg-surface-2 p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-good text-white"
                aria-hidden="true"
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[14.5px] font-medium leading-snug text-ink-3 line-through">
                  {item.title}
                </h3>
                {(item.category || item.tags?.length > 0) && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {item.category && (
                      <span className="inline-flex items-center rounded-md border border-line bg-surface px-2 py-0.5 text-[11.5px] font-medium text-ink-3">
                        {item.category}
                      </span>
                    )}
                    {item.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-0.5 text-[11.5px] font-medium text-ink-3"
                      >
                        <TagIcon className="h-3 w-3 opacity-70" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default CompletedTodoList;
