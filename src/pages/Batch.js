import React, { useState, useEffect } from "react";
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

const BatchComponent = ({ title = "Batch Overview", apiUrl }) => {
  const [batches, setBatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  // Fetch batches from API
  const fetchBatches = async (page = 0) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${currentPage}&select=title,price,stock`
      );
      setBatches(response.data.products); // Assuming response.data.data contains the list of batches
      setTotalItems(response.data.total); // Assuming response.data.total gives the total number of items
    } catch (error) {
      console.error("Error fetching batch data:", error);
    }
  };

  // Fetch data on mount and page change
  useEffect(() => {
    fetchBatches(currentPage);
  }, [currentPage]);

  // Sorting logic
  const sortedBatches = [...batches].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "ascending" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  // Handle sorting on header click
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle pagination click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Get status styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-[#31ABEB]/10 text-[#31ABEB]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 overflow-x-auto">
      {/* Add New Batch Button */}
      <div className="md:flex block justify-end items-center mb-4">
        {/* <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2> */}
        <button className="bg-[#31ABEB] text-white px-4 py-2 rounded-md">
          Add Batch
        </button>
      </div>

      <Card className="w-full mx-auto shadow-xl border border-[#31ABEB]/20">
        <CardHeader className="bg-[#31ABEB] text-white rounded-t-lg">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center py-4">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
      {/* Ensure horizontal scroll for the table */}
      <div className=" bg-white rounded-lg shadow table-container">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-[#31ABEB]/10">
              <TableHead
                className="font-semibold text-[#31ABEB] cursor-pointer"
                onClick={() => handleSort("id")}
              >
                Batch ID{" "}
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="font-semibold text-[#31ABEB] cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="font-semibold text-[#31ABEB]">
                Items
              </TableHead>
              <TableHead
                className="font-semibold text-[#31ABEB] cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date{" "}
                {sortConfig.key === "date" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBatches.length > 0 ? (
              sortedBatches.map((batch) => (
                <TableRow
                  key={batch.id}
                  className="hover:bg-[#31ABEB]/5 transition-colors"
                >
                  <TableCell className="font-medium text-[#31ABEB]">
                    {batch.id}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        batch.title
                      )}`}
                    >
                      {batch.title}
                    </span>
                  </TableCell>
                  <TableCell>{batch.price}</TableCell>
                  <TableCell>{batch.stock}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-[#31ABEB]"
                >
                  No batch data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="block md:flex justify-center mt-4 flex-wrap">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          forcePage={currentPage}
          pageCount={totalItems}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center flex-wrap mt-4 space-x-2 space-y-2 "
          pageClassName="block"
          pageLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-[#31ABEB] hover:text-white focus:bg-[#31ABEB] focus:text-white transition-colors duration-300"
          previousLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-[#31ABEB] hover:text-white focus:bg-[#31ABEB] focus:text-white transition-colors duration-300"
          nextLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-[#31ABEB] hover:text-white focus:bg-[#31ABEB] focus:text-white transition-colors duration-300"
          breakLinkClassName="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600"
          activeLinkClassName="bg-[#31ABEB] text-black "
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
      </CardContent>
      </Card>
    </div>
  );
};

export default BatchComponent;
