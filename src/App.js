import DataTable from "./components/data-table";
import HeroPanel from "./components/hero-panel";
import ActivitySection from "./components/activity-section";
import { getTableData, getActions, getNotifications } from "./utility";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories, setDataTable } from "./store/reducers/data-table";
import { setDataActionNeeded } from "./store/reducers/action-needed";
import { setNotification } from "./store/reducers/notification";

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const tableData = getTableData()
    const actions = getActions()
    const notifications = getNotifications()

    dispatch(setCategories(tableData.categories))
    dispatch(setDataTable(tableData.values))
    dispatch(setDataActionNeeded(actions))
    dispatch(setNotification(notifications))
  }, [])

  return <div className="container mx-auto">
    <HeroPanel />
    <ActivitySection />
    <DataTable />
  </div>;
}
