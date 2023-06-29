<template>
  <ul class="pagination-container">
    <li
      class="pagination-item"
      :class="{ disabled: currentPage === 1 }"
      @click="emitCurrentChangePrevious"
    >
      <font-awesome-icon class="icon" icon="angle-left" />
    </li>

    <li
      v-for="(pageNumber, index) in paginationRange"
      :key="`${pageNumber}${index}`"
      :class="calculateListItemClasses(pageNumber)"
      @click="emitCurrentChange(pageNumber)"
    >
      {{ calculateListItemContent(pageNumber) }}
    </li>

    <li
      class="pagination-item"
      :class="{ disabled: currentPage === lastPage }"
      @click="emitCurrentChangeNext"
    >
      <font-awesome-icon class="icon" icon="angle-right" />
    </li>
  </ul>
</template>

<script>
// The following code is modified from https://github.com/mayankshubham/react-pagination

const DOTS = '...'
function range(start, end) {
  const length = end - start + 1
  /*
    Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start)
}

function calculatePaginationRange(
  totalCount,
  pageSize,
  siblingCount,
  currentPage
) {
  const totalPageCount = Math.ceil(totalCount / pageSize)
  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const totalPageNumbers = siblingCount + 5

  /*
    Case 1:
    If the number of pages is less than the page numbers we want to show in our
    paginationComponent, we return the range [1..totalPageCount]
  */
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount)
  }

  /*
    Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
  */
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

  /*
    We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
  */
  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

  const firstPageIndex = 1
  const lastPageIndex = totalPageCount

  /*
    Case 2: No left dots to show, but rights dots to be shown
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = range(1, leftItemCount)

    return [...leftRange, DOTS, totalPageCount]
  }

  /*
    Case 3: No right dots to show, but left dots to be shown
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    )

    return [firstPageIndex, DOTS, ...rightRange]
  }

  /*
    Case 4: Both left and right dots to be shown
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex)

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }
}

export default {
  name: 'Pagination',
  props: {
    totalCount: {
      required: true,
      type: Number,
    },
    currentPage: {
      required: true,
      type: Number,
    },
    pageSize: {
      required: true,
      type: Number,
    },
    siblingCount: {
      required: false,
      type: Number,
      default: () => 1,
    },
  },
  computed: {
    lastPage() {
      if (this.paginationRange) {
        return this.paginationRange[this.paginationRange.length - 1]
      }
      return 0
    },
    paginationRange() {
      return calculatePaginationRange(
        this.totalCount,
        this.pageSize,
        this.siblingCount,
        this.currentPage
      )
    },
  },
  methods: {
    calculateListItemContent(pageNumber) {
      if (pageNumber === DOTS) {
        return '...'
      } else {
        return pageNumber
      }
    },
    calculateListItemClasses(pageNumber) {
      const classes = ['pagination-item']

      if (pageNumber === DOTS) {
        classes.push('dots')
      }

      if (pageNumber === this.currentPage) {
        classes.push('active')
      }

      return classes
    },
    isCurrentPage(page) {
      return page === this.currentPage
    },
    emitCurrentChange(clickedPage) {
      return this.$emit('current-change', clickedPage)
    },
    emitCurrentChangeNext() {
      const nextPage =
        this.currentPage >= this.pageCount
          ? this.currentPage
          : this.currentPage + 1

      return this.emitCurrentChange(nextPage)
    },
    emitCurrentChangePrevious() {
      const nextPage =
        this.currentPage <= 1 ? this.currentPage : this.currentPage - 1

      return this.emitCurrentChange(nextPage)
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  flex-direction: row;
  list-style: none;

  .pagination-item {
    padding: 0.5rem 1rem;
    line-height: 1.25;
    border-radius: 8%;
    margin: 0 1px;
    cursor: pointer;

    &.active {
      background-color: var(--pagination-number-active);
      color: var(--pagination-number-active-text);
    }

    &:hover {
      background-color: var(--pagination-number-active);
      color: var(--pagination-number-active-text);
      opacity: 0.7;
    }

    &.arrow:hover {
      background: transparent;
      color: var(--pagination-number-active);
    }
  }
}
</style>
