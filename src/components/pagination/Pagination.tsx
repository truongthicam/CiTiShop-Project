import React from "react";
import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import Icon from "../icon/Icon";
import { StyledPagination } from "./PaginationStyle";

export interface PaginationProps extends SpaceProps {
  pageCount: number;
  currentPage?: number;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
  onChange?: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage, // Start at 1
  marginPagesDisplayed,
  pageRangeDisplayed,
  onChange,
  ...props
}) => {
  const handlePageChange = async (page: { selected: number; }) => {
    if (onChange) onChange(page.selected); // page.selected start at 0
    // console.log(page);
  };

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        previousLabel={
          <Button
            className="control-button"
            color="primary"
            overflow="hidden"
            height="auto"
            padding="6px"
            borderRadius="50%"
          >
            <Icon defaultcolor="currentColor" variant="small">
              chevron-left
            </Icon>
          </Button>
        }
        nextLabel={
          <Button
            className="control-button"
            color="primary"
            overflow="hidden"
            height="auto"
            padding="6px"
            borderRadius="50%"
          >
            <Icon defaultcolor="currentColor" variant="small">
              chevron-right
            </Icon>
          </Button>
        }
        breakLabel={
          <Icon defaultcolor="currentColor" variant="small">
            triple-dot
          </Icon>
        }
        pageCount={pageCount}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        // subContainerClassName="pages pagination"
        activeClassName="active"
        disabledClassName="disabled"
        forcePage={currentPage ? currentPage - 1 : null} // Page index start at 0
      />
    </StyledPagination>
  );
};

export default Pagination;
