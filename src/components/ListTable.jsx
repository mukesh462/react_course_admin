import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const BatchComponent = forwardRef(
  (
    { title = "Batch Overview", apiUrl, config, onClickRow, buttonProp },
    ref
  ) => {
    const [batches, setBatches] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [sortConfig, setSortConfig] = useState({
      key: "name", // default sorting key
      direction: "ascending",
    });
    const [useRefreshState, setuseRefresh] = useState(false);

    const fetchBatches = async (page = 0) => {
      try {
        const baseUrl = process.env.REACT_APP_URL;
        const response = await axios.post(baseUrl + apiUrl, {
          limit: itemsPerPage,
          page: page + 1, // API expects page numbers to start from 1
        });

        if (response.data.status) {
          setBatches(response.data.data); // Get the array from the 'data' key
          setTotalItems(response.data.paginate.total_count); // Use the 'total_count' from 'paginate'
        }
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    useEffect(() => {
      fetchBatches(currentPage);
    }, [currentPage, useRefreshState]);

    const handleRowClick = (batch) => {
      if (onClickRow) {
        onClickRow(batch);
      }
    };

    const sortedBatches = [...batches].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

    const handleSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };

    const data = useSelector((state) => state.login?.user);
    const useRefresh = () => {
      setCurrentPage(0);
      setTotalItems(0);
      setuseRefresh(!useRefreshState);
    };

    useImperativeHandle(ref, () => ({ useRefresh }));

    return (
      <div ref={ref} className="min-h-screen p-4 sm:p-6 md:p-8 overflow-x-auto">
        <Card className="w-full mx-auto shadow-xl border border-[#31ABEB]/20">
          <CardHeader className="bg-[#31ABEB] text-white rounded-t-lg flex items-center justify-between">
            <CardTitle className="text-2xl sm:text-3xl font-bold py-4">
              {title}
            </CardTitle>
            <div className="md:flex block justify-end items-center mb-4 text-sm">
              {data.isAdmin == 1 && (
                <button
                  className="bg-green-400 font-bold text-white px-4 py-2 rounded-md flex gap-2 items-center justify-center"
                  {...buttonProp}
                >
                  <IoIosAddCircleOutline className="text-2xl" /> Add
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="bg-white rounded-lg shadow table-container">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-[#31ABEB]/10">
                    {config.map((col) => (
                      <TableHead
                        key={col.data}
                        className={`font-semibold text-[#31ABEB] cursor-pointer ${col.className}`}
                        onClick={() => col.sortable && handleSort(col.data)}
                      >
                        {col.colname}{" "}
                        {sortConfig.key === col.data &&
                          (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBatches.length > 0 ? (
                    sortedBatches.map((batch) => (
                      <TableRow
                        key={batch._id} // Use the _id for uniqueness
                        className="hover:bg-[#31ABEB]/5 transition-colors"
                        onClick={() => handleRowClick(batch)}
                      >
                        {config.map((col) => (
                          <TableCell key={col.data} className={col.className}>
                            {col.render ? col.render(batch) : batch[col.data]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={config.length}
                        className="text-center py-4 text-[#31ABEB]"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="block md:flex justify-center mt-4 flex-wrap">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                forcePage={currentPage}
                pageCount={Math.ceil(totalItems / itemsPerPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="flex items-center justify-center flex-wrap mt-4 space-x-2 space-y-2"
                pageClassName="block"
                pageLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-[#31ABEB] hover:text-white focus:bg-[#31ABEB] focus:text-white transition-colors duration-300"
                previousLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-[#31ABEB] hover:text-white focus:bg-[#31ABEB] focus:text-white transition-colors duration-300"
                nextLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-[#31ABEB] hover:text-white focus:bg-[#31ABEB] focus:text-white transition-colors duration-300"
                breakLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600"
                activeLinkClassName="bg-[#31ABEB] text-black"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

export default BatchComponent;
