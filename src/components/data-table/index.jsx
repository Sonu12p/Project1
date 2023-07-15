import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import Box from "../box";

export default function DataTable() {
  const [idSelected, setIdSelected] = useState("paytype_id");

  const { categories, data } = useSelector((state) => state.dataTableReducer);

  const dataFormated = useMemo(() => {
    if (data.length) {
      return data.reduce((result, current) => {
        if (result[current[idSelected]]) {
          result[current[idSelected]] = {
            [idSelected]: current[idSelected],
            amount: Number(
              (
                result[current[idSelected]].amount + Number(current.amount)
              ).toFixed(2)
            ),
            date: result[current[idSelected]].date,
          };
        } else {
          result[current[idSelected]] = {
            [idSelected]: current[idSelected],
            amount: Number(current.amount),
            date: current.date,
          };
        }
        return result;
      }, {});
    }
    return {};
  }, [data, idSelected]);

  const handleSelectedId = (id) => {
    setIdSelected(id);
  };

  return (
    <div className="pb-32">
      <div className="text-32 font-semibold mb-24 text-[#1A2B55]">Data Table</div>
      <Box>
        <div>
          <div className=" mb-24">
            <ul className="flex gap-12">
              <li
                onClick={() => handleSelectedId("paytype_id")}
                className={` cursor-pointer ${
                  idSelected === "paytype_id"
                    ? "bg-[#EFF6FA] text-black  font-semibold"
                    : "hover:bg-[#EFF6FA] hover:text-black text-[#B1B4C0]"
                } rounded-12 px-8 py-4`}
              >
                PaytypeId
              </li>
              <li
                onClick={() => handleSelectedId("provider_id")}
                className={`text-[#B1B4C0] cursor-pointer ${
                  idSelected === "provider_id"
                  ? "bg-[#EFF6FA] text-black  font-semibold"
                  : "hover:bg-[#EFF6FA] hover:text-black"
                } rounded-12 px-8 py-4`}
              >
                Provider ID
              </li>
              <li
                onClick={() => handleSelectedId("employee_type_id")}
                className={`text-[#B1B4C0] cursor-pointer ${
                  idSelected === "employee_type_id"
                  ? "bg-[#EFF6FA] text-black  font-semibold"
                  : "hover:bg-[#EFF6FA] hover:text-black"
                } rounded-12 px-8 py-4`}
              >
                Employee ID
              </li>
            </ul>
          </div>
          <table className="w-full text-center bg-[#E0E1E5]">
            <thead>
              <tr>
                <th className="py-8">DATE</th>
                <th className="uppercase py-8">{idSelected}</th>
                <th className="py-8">VALUE</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(dataFormated).length > 0 &&
              Object.values(dataFormated).map((item, i) => (
                <tr key={i}>
                  <td className="py-8">{item.date}</td>
                  <td className="py-8">
                    {categories[idSelected][item[idSelected]]}
                  </td>
                  <td className="py-8">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </div>
  );
}
