<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';
import { usePagination } from '../../shared/viewModel/usePagination';

defineOptions({
  name: 'Home',
});

interface RowData {
  key: number;
  name: string;
  age: number;
  address: string;
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: 'selection',
      fixed: 'left',
      width: 20,
      maxWidth: 50,
    },
    {
      title: '姓名',
      key: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: '年龄',
      key: 'age',
      width: 100,
      fixed: 'left',
    },

    {
      title: 'Address',
      key: 'address',
      width: 200,
      fixed: 'right',
    },
  ];
}

const data = ref<RowData[]>([]);
const rawData = computed(() =>
  Array.from({ length: 51 }, (_, index) => ({
    key: index,
    name: `Edward King ${index + 1}`,
    age: 18,
    address: `London, Park Lane no. ${index + 1}`,
  })),
);

async function loadData() {
  data.value = getPaginatedData(rawData.value);
}

const columns = createColumns();
const { pagination, pageSizes, changePageNumber, changePageSize, getPaginatedData } =
  usePagination();

const handlePageChange = (newPage: number) => {
  changePageNumber(newPage);
  data.value = getPaginatedData(rawData.value);
};

const handlePageSizeChange = (newSize: number) => {
  changePageSize(newSize);
  data.value = getPaginatedData(rawData.value);
};

onMounted(() => {
  loadData();
  pagination.value.total = rawData.value.length;
});
</script>
<template>
  <div class="home">
    <n-data-table
      :columns="columns"
      :data="data"
      :scroll-x="'100%'"
      :style="{ height: '100%' }"
      flex-height
      class="table"
    />
    <n-pagination
      v-model:page="pagination.pageNumber"
      @update:page="handlePageChange"
      :item-count="pagination.total"
      v-model:page-size="pagination.pageSize"
      @update:page-size="handlePageSizeChange"
      :page-sizes="pageSizes"
      show-quick-jumper
      show-size-picker
      class="pagination"
    />
  </div>
</template>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  grid-template-areas: 'table' 'pagination';
  .table {
    grid-area: table;
  }
  .pagination {
    grid-area: pagination;
    display: flex;
    align-items: center;
    padding: 8px;
  }
}
</style>
