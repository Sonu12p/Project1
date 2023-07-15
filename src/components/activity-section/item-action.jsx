import moment from "moment";
import { actionStatus } from "../../constants";
import Avatar from "../avatar";
import Tag from "../tag";

export default function ItemAction({
  tag,
  description,
  name,
  item,
  handleChangeStatusOfActionNeeded,
}) {
  return (
    <div className="flex px-24 py-12 border rounded-12 gap-24">
      <div className="flex items-center justify-center">
        <Avatar name={name} />
      </div>
      <div className="flex-1">
        <div className="mb-8">
          <Tag {...tag} />
        </div>
        <div className="font-semibold text-14">{description}</div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="mb-8 text-slate-500 text-12">{moment(new Date(item.date_created)).format(' hh:mm:ss DD/MM/YYYY')}</div>
        {item.status === actionStatus.PENDING && (
          <div className="flex gap-24">
            <button
              onClick={() =>
                handleChangeStatusOfActionNeeded(item, actionStatus.COMPLETED)
              }
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24 text-green-500 border rounded-10 p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                handleChangeStatusOfActionNeeded(item, actionStatus.IGNORED)
              }
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24 text-red-500 border rounded-10 p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
