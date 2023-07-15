import moment from "moment";
// import { COLORS } from "../../constant/colors";
import Avatar from "../avatar";
import Dot from "../dot";
import Tag from "../tag";

export default function ItemNotification({ tag, description, name, unread, item }) {
  return (
    <div className="flex px-24 py-12 border rounded-12 gap-24">
      <div className="flex items-center justify-center">
        <Avatar name={name} />
      </div>
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between">
          <Tag {...tag} />
        <div className="text-slate-500 text-12">{moment(new Date(item.date_created)).format(' hh:mm DD/MM/YYYY')}</div>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold text-14 flex-1">{description}</div>
          {unread &&  <Dot colorHex="#DB9F4D" />}
        </div>
      </div>
    </div>
  );
}
