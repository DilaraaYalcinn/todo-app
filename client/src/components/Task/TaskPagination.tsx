import React, { useState, useMemo, useEffect } from "react";
import { Pagination, Box, Typography } from "@mui/material";

interface TaskPaginationProps<T> {
  items: T[];
  rowsPerPage?: number;
  children: (paginatedItems: T[]) => React.ReactNode;
  showCount?: boolean;
}

function TaskPagination<T>({
  items,
  rowsPerPage = 6,
  children,
  showCount = true,
}: TaskPaginationProps<T>) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(items.length / rowsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [page, pageCount]);

  return (
    <>
      {children(paginatedItems)}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {showCount && (
          <Typography variant="body2" sx={{ color: "black" }}>
            Total: {items.length}
          </Typography>
        )}
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="small"
          />
        )}
      </Box>
    </>
  );
}

export default TaskPagination;
