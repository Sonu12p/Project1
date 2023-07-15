import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';

import Box from "../box";
import Dot from "../dot";
import ItemAction from "./item-action";
import ItemNotification from "./item-notification";
import {
  actionFilterMap,
  actionStatus,
  filterActivityOptions,
  notificationStatus,
  notificationFilterMap,
  REQUIRED_ACTIONS_PAGE_SIZE,
  NOTIFICATIONS_PAGE_SIZE,
} from "../../constants";
import { updateActionNeeded } from "../../store/reducers/action-needed";
import Loading from "../loading";

const filterActionNeededByActivity = (data, filter) => {
  if (filter === "ALL") {
    return data;
  }
  return data.filter((item) => {
    let isCorrect = false;
    Object.keys(actionFilterMap).forEach((key) => {
      const value = actionFilterMap[key];
      const filterType = value.filters.find((f) => f === item.event_type);
      if (filterType && key === filter) {
        isCorrect = true;
      }
    });
    return isCorrect;
  });
};

const filterNotificationByActivity = (data, filter) => {
  if (filter === "ALL") {
    return data;
  }
  return data.filter((item) => {
    let isCorrect = false;
    Object.keys(notificationFilterMap).forEach((key) => {
      const value = notificationFilterMap[key];
      const filterType = value.filters.some((f) => f === item.event_type);
      if (filterType && key === filter) {
        isCorrect = true;
      }
    });

    return isCorrect;
  });
};

export default function ActivitySection() {
  const dispatch = useDispatch();

  const [actionNeeded, notification] = useSelector((state) => [
    state.actionNeededReducer,
    state.notificationReducer,
  ]);

  const [filter, setFilter] = useState("ALL");
  const [actionNeededSize, setActionNeededSize] = useState(REQUIRED_ACTIONS_PAGE_SIZE);
  const [notificationSize, setNotificationSize] = useState(NOTIFICATIONS_PAGE_SIZE);
  const [filterAction, setFilterAction] = useState("all");
  const [filterNotification, setFilterNotification] = useState(
    notificationStatus.UNREAD
  );

  const handleSelectFilter = (value) => {
    setFilter(value);
  };

  const handleSelectFilterAction = (value) => {
    setFilterAction(value);
  };

  const handleSelectFilterNotification = (value) => {
    setFilterNotification(value);
  };

  const handleChangeStatusOfActionNeeded = (item, status) => {
    const input = {
      ...item,
      status,
    };
    dispatch(updateActionNeeded(input));
  };

  const fetchMoreData = () => {
    if (actionNeededSize + REQUIRED_ACTIONS_PAGE_SIZE <= actionNeeded.data.length) {
      setTimeout(() => {
        setActionNeededSize(prev => prev + REQUIRED_ACTIONS_PAGE_SIZE)
      }, 1500)
    }
  }
 
  const fetchMoreNotificationData = () => {
    if (notificationSize + NOTIFICATIONS_PAGE_SIZE <= notification.data.length) {
      setTimeout(() => {
        setNotificationSize(prev => prev + NOTIFICATIONS_PAGE_SIZE)
      }, 1500)
    }
  }
  const [dataFormated, maxLength] = useMemo(() => {
    if (actionNeeded.data.length > 0) {
      let filterData = [];
      if (filterAction === "all") {
        filterData = actionNeeded.data;
      } else {
        filterData = actionNeeded.data.filter((d) => d.status === filterAction);
      }
      
      const data =  filterActionNeededByActivity(filterData, filter);
      
      return [data.slice(0, actionNeededSize), data.length]
    }
    return [actionNeeded.data,actionNeeded.data.length];
  }, [actionNeeded.data, filterAction, filter, actionNeededSize]);

  const [dataNotificationFormated, maxNotificationLength] = useMemo(() => {
    if (notification.data.length > 0) {
      let filterData = [];
      if (filterNotification === "all") {
        filterData = notification.data;
      } else {
        filterData = notification.data.filter(
          (d) => d.status === filterNotification
        );
      }
      const data =  filterActionNeededByActivity(filterData, filter);

      return [data.slice(0, notificationSize), data.length]
    }
    return [notification.data, notification.data.length];
  }, [notification.data, filterNotification, filter, notificationSize]);

  return (
    <div className="mb-24">
      <div className="text-32 font-semibold mb-24 text-[#1A2B55]">Activity</div>
      <Box>
        <div className="grid grid-cols-12 gap-24 pt-24">
          <div className="col-span-2">
            <div className="flex gap-12 mb-12 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-18 h-18"
              >
                <path
                  fillRule="evenodd"
                  d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Filter Activity</span>
            </div>
            <div>
              <ul>
                <li
                  onClick={() => handleSelectFilter("ALL")}
                  className={` cursor-pointer px-12 py-4 ${
                    filter === "ALL" ? "text-blue-500" : ""
                  } mb-8 text-14 font-semibold`}
                >
                  <Dot />
                  Select All
                </li>
                {filterActivityOptions.map((item) => {
                  const selected = item.value === filter;
                  return (
                    <li
                      onClick={() => handleSelectFilter(item.value)}
                      key={item.label}
                      className={`${
                        selected ? "text-blue-500" : ""
                      } px-12 cursor-pointer py-4 bg-slate-100 rounded-12 mb-8 text-14 font-semibold`}
                    >
                      <Dot colorHex={item.color} />
                      <span className="ml-4">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex pb-8 items-center justify-between border-b mb-12">
              <div className="text-24 font-semibold">Action Needed</div>
              <ul className="flex gap-12 items-center">
                <li
                  onClick={() => handleSelectFilterAction(actionStatus.PENDING)}
                  className={`cursor-pointer text-14 ${
                    filterAction === actionStatus.PENDING
                      ? "bg-[#EFF6FA] text-black font-semibold"
                      : "hover:bg-[#EFF6FA] hover:text-black"
                  } rounded-12 px-8 py-4`}
                >
                  Pending
                </li>
                <li
                  onClick={() => handleSelectFilterAction(actionStatus.IGNORED)}
                  className={` cursor-pointer text-14 ${
                    filterAction === actionStatus.IGNORED
                      ? "bg-[#EFF6FA] text-black font-semibold"
                      : "hover:bg-[#EFF6FA] hover:text-black"
                  } rounded-12 px-8 py-4`}
                >
                  Ignored
                </li>
                <li
                  onClick={() =>
                    handleSelectFilterAction(actionStatus.COMPLETED)
                  }
                  className={` cursor-pointer text-14 ${
                    filterAction === actionStatus.COMPLETED
                      ? "bg-[#EFF6FA] text-black font-semibold"
                      : "hover:bg-[#EFF6FA] hover:text-black"
                  } rounded-12 px-8 py-4`}
                >
                  Completed
                </li>
                <li
                  onClick={() => handleSelectFilterAction("all")}
                  className={` cursor-pointer text-14 ${
                    filterAction === "all"
                      ? "bg-[#EFF6FA] text-black font-semibold"
                      : "hover:bg-[#EFF6FA] hover:text-black"
                  } rounded-12 px-8 py-4`}
                >
                  All
                </li>
              </ul>
            </div>
            <div id="action-needed" className="overflow-auto max-h-[600px] pr-12">
            <InfiniteScroll
              dataLength={dataFormated.length}
              next={fetchMoreData}
              scrollableTarget="action-needed"
              hasMore={dataFormated.length !== maxLength}
              loader={<div className="flex items-center justify-center"><Loading /></div>}
              refreshFunction={() => {}}
              pullDownToRefresh
              pullDownToRefreshThreshold={600}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              }
            >
               {dataFormated.map((item) => {
                let colorText = "";
                let background = "";
                let text = "";
                Object.keys(actionFilterMap).forEach((key) => {
                  const value = actionFilterMap[key];
                  const filterType = value.filters.some(
                    (f) => f === item.event_type
                  );
                  if (filterType) {
                    const { color, bgColor, label } =
                      filterActivityOptions.find((f) => f.value === key);
                    colorText = color;
                    background = bgColor;
                    text = label;
                  }
                });
                return (
                  <div className="mb-12" key={item.id}>
                    <ItemAction
                      item={item}
                      handleChangeStatusOfActionNeeded={
                        handleChangeStatusOfActionNeeded
                      }
                      name={`${item.patient_first_name} ${item.patient_last_name}`}
                      tag={{
                        text: text,
                        color: colorText,
                        background: background,
                      }}
                      description="Vanessage hoin has answered a question on that needs your review"
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex pb-8 items-center justify-between border-b mb-12">
              <div className="text-24 font-semibold">Notifications</div>
              <ul className="flex gap-12  items-center ">
                <li
                  onClick={() =>
                    handleSelectFilterNotification(notificationStatus.UNREAD)
                  }
                  className={` cursor-pointer text-14 ${
                    filterNotification === notificationStatus.UNREAD
                      ? "bg-[#EFF6FA] text-black font-semibold"
                      : "hover:bg-[#EFF6FA] hover:text-black"
                  } rounded-12 px-8 py-4`}
                >
                  Unread
                </li>
                <li
                  onClick={() => handleSelectFilterNotification("all")}
                  className={` cursor-pointer text-14 ${
                    filterNotification === "all"
                      ? "bg-[#EFF6FA] text-black font-semibold"
                      : "hover:bg-[#EFF6FA] hover:text-black"
                  } rounded-12 px-8 py-4`}
                >
                  All
                </li>
              </ul>
            </div>
            <div id="notification" className="overflow-auto max-h-[600px] pr-12">
            <InfiniteScroll
              dataLength={dataNotificationFormated.length}
              next={fetchMoreNotificationData}
              scrollableTarget="notification"
              hasMore={dataNotificationFormated.length !== maxNotificationLength}
              loader={<div className="flex items-center justify-center"><Loading /></div>}
              refreshFunction={() => {}}
              pullDownToRefresh
              pullDownToRefreshThreshold={600}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              }
            >
               {dataNotificationFormated.map((item) => {
                let colorText = "";
                let background = "";
                let text = "";
                Object.keys(notificationFilterMap).forEach((key) => {
                  const value = notificationFilterMap[key];
                  const filterType = value.filters.some(
                    (f) => f === item.event_type
                  );
                  if (filterType) {
                    const { color, bgColor, label } =
                      filterActivityOptions.find((f) => f.value === key);
                    colorText = color;
                    background = bgColor;
                    text = label;
                  }
                });
                return (
                  <div className="mb-12" key={item.id}>
                    <ItemNotification
                      item={item}
                      unread={item.status === notificationStatus.UNREAD}
                      name={`${item.patient_first_name} ${item.patient_last_name}`}
                      tag={{
                        text: text,
                        color: colorText,
                        background: background,
                      }}
                      description="Vanessage hoin has answered a question on that needs your review"
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
              
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
