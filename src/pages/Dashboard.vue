<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import MainContentWarp from "@/components/MainContentWarp.vue";
import { onMounted, ref } from "vue";
import { useApp } from "@/stores/app.js";
import ReportService from "@/services/ReportService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Chart from "primevue/chart";
import AutoComplete from "primevue/autocomplete";

import DynamicDialog from "primevue/dynamicdialog";
const storeApp = useApp();
const charCusttData = ref(null);
const chartItemData = ref(null);
const chartWhshelfData = ref(null);
const chartWhData = ref(null);
const chartDoctyp = ref(null);
const chartItem = ref();
const filteredCountries = ref();
const chartCust = ref();
const chartWhshelf = ref();
const chartWh = ref();
const chartDoctype = ref();
const position = ref("center");
const chartmode = ref(1);
const visible = ref(false);
const filtersitem = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const filterscust = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const filterswh = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const filterswhshelf = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const filtersdoc = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const openPosition = (pos) => {
  position.value = pos;
  visible.value = true;
};
const loadingItem = ref(true);
const loadingCust = ref(true);
const loadingWh = ref(true);
const loadingWhshelf = ref(true);
const loadingDoc = ref(true);

const fromdate = ref("2022-01-01");
const todate = ref("2022-12-31");
const doctype = ref("");
const custcode = ref("");
const inquiry = ref("");
const vattype = ref("");
const ispos = ref("");
const itemcode = ref("");
const whcode = ref("");
const shelfcode = ref("");
const salecode = ref("");

onMounted(() => {
  storeApp.setActivePage("dashboard");
  storeApp.setActiveChild("");
  storeApp.setPageTitle("แดรชบอร์ด");
  setTimeout(() => {
    getDashboard();
  }, 500);
});

async function getDashboard() {
  chartItem.value = [];
  chartCust.value = [];
  chartWh.value = [];
  chartWhshelf.value = [];
  chartDoctype.value = [];
  loadingItem.value = true;
  loadingCust.value = true;
  loadingWh.value = true;
  loadingWhshelf.value = true;
  loadingDoc.value = true;

  chartItem.value = await getSaleReport("item");
  loadingItem.value = false;
  chartCust.value = await getSaleReport("custcode");
  loadingCust.value = false;
  chartWh.value = await getSaleReport("warehouse");
  loadingWh.value = false;

  chartWhshelf.value = await getSaleReport("warehouseshelf");
  loadingWhshelf.value = false;

  chartDoctype.value = await getSaleReport("doctype");
  loadingDoc.value = false;
  pushchartCust();
  pushchartWhData();

  pushchartWhshelfData();
  pushDocType();
  pushchartitem();
}
function pushchartCust() {
  const data = chartCust.value;
  const labels = data.map((item) => item.custcode);
  const values = data.map((item) => item.sumamount);
  charCusttData.value = {
    labels,
    datasets: [
      {
        label: "CustCode",
        data: values,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
          "#7E57C2",
          "#78909C",
        ],
      },
    ],
  };
  // products.value.forEach((element) => {
  //   // chartData.datasets[0].data = element.qty_in;
  // });
  // chartData.datasets[0].data.push([10, 20, 30, 40]);
  // console.log(chartData.datasets[0].data);
}
function pushchartWhData() {
  const data = chartWh.value;
  const labels = data.map((item) => item.whcode);
  const values = data.map((item) => item.sumamount);
  chartWhData.value = {
    labels,
    datasets: [
      {
        label: "werehose",
        data: values,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
          "#7E57C2",
          "#78909C",
        ],
      },
    ],
  };
  // products.value.forEach((element) => {
  //   // chartData.datasets[0].data = element.qty_in;
  // });
  // chartData.datasets[0].data.push([10, 20, 30, 40]);
  // console.log(chartData.datasets[0].data);
}
function pushchartWhshelfData() {
  const data = chartWhshelf.value;
  const labels = data.map((item) => item.shelfcode);
  const values = data.map((item) => item.sumamount);
  chartWhshelfData.value = {
    labels,
    datasets: [
      {
        label: "werehoseShelf",
        data: values,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
          "#7E57C2",
          "#78909C",
        ],
      },
    ],
  };
  // products.value.forEach((element) => {
  //   // chartData.datasets[0].data = element.qty_in;
  // });
  // chartData.datasets[0].data.push([10, 20, 30, 40]);
  // console.log(chartData.datasets[0].data);
}
function pushDocType() {
  const data = chartDoctype.value;
  const labels = data.map((item) => item.doctype);
  const values = data.map((item) => item.sumamount);
  chartDoctyp.value = {
    labels,
    datasets: [
      {
        label: "Doctype",
        data: values,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
          "#7E57C2",
          "#78909C",
        ],
      },
    ],
  };
  // products.value.forEach((element) => {
  //   // chartData.datasets[0].data = element.qty_in;
  // });
  // chartData.datasets[0].data.push([10, 20, 30, 40]);
  // console.log(chartData.datasets[0].data);
}
function pushchartitem() {
  const data = chartItem.value;
  const labels = data.map((item) => item.itemcode);
  const values1 = data.map((item) => item.sumamount);
  const values2 = data.map((item) => item.sumofcost);
  const values3 = data.map((item) => item.discount);
  const values4 = data.map((item) => item.qty);
  chartItemData.value = {
    labels,
    datasets: [
      {
        label: "sumamount",
        data: values1,
        backgroundColor: [
          "#66BB6A",
          "#42A5F5",

          "#FFA726",
          "#26C6DA",
          "#7E57C2",
          "#78909C",
        ],
      },
      {
        label: "sumofcost",
        data: values2,
        backgroundColor: [
          "#FFA726",
          "#42A5F5",
          "#66BB6A",

          "#26C6DA",
          "#7E57C2",
          "#78909C",
        ],
      },

      {
        label: "qty",
        data: values4,
        backgroundColor: [
          "#7E57C2",
          "#26C6DA",
          "#FFA726",
          "#42A5F5",
          "#66BB6A",

          "#78909C",
        ],
      },
    ],
  };
  // products.value.forEach((element) => {
  //   // chartData.datasets[0].data = element.qty_in;
  // });
  // chartData.datasets[0].data.push([10, 20, 30, 40]);
  // console.log(chartData.datasets[0].data);
}
function number() {
  chartmode.value += 1;
  console.log(chartmode.value);
  if (chartmode.value > 2) {
    chartmode.value -= 3;
  }
}
async function getSaleReport(mode) {
  var result = [];
  await ReportService.getSaleReportMode(
    mode,
    fromdate.value,
    todate.value,
    doctype.value,
    custcode.value,
    inquiry.value,
    vattype.value,
    ispos.value,
    itemcode.value,
    whcode.value,
    shelfcode.value,
    salecode.value
  )
    .then((res) => {
      console.log(res);
      if (res.success) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
}
function search() {
  console.log(`Searching for customer with code ${custcode}`);
}
</script>

<template>
  <AppLayout>
    <MainContentWarp>
      <div>
        <Button
          label="ตัวกรอง"
          icon="pi pi-filter"
          @click="openPosition('top')"
          severity="warning"
          style="min-width: 10rem"
        />
      </div>
      <div class="p-5">
        <div class="grid">
          <div class="col-12 lg:col-6 xl:col-3">
            <div
              class="surface-card shadow-2 p-3 border-1 border-50 border-round"
            >
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Orders</span>
                  <div class="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">24 new </span>
              <span class="text-500">since last visit</span>
            </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
            <div
              class="surface-card shadow-2 p-3 border-1 border-50 border-round"
            >
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Revenue</span>
                  <div class="text-900 font-medium text-xl">$2.100</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-orange-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">%52+ </span>
              <span class="text-500">since last week</span>
            </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
            <div
              class="surface-card shadow-2 p-3 border-1 border-50 border-round"
            >
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Customers</span>
                  <div class="text-900 font-medium text-xl">28441</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">520 </span>
              <span class="text-500">newly registered</span>
            </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
            <div
              class="surface-card shadow-2 p-3 border-1 border-50 border-round"
            >
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Comments</span>
                  <div class="text-900 font-medium text-xl">152 Unread</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-purple-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-comment text-purple-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">85 </span>
              <span class="text-500">responded</span>
            </div>
          </div>
          <div class="col-12 xl:col-6">
            <div class="surface-card shadow-2 border-round p-4">
              <span class="text-xl text-900 font-medium"
                >Customers Code Chart</span
              >
              <Button
                icon="pi pi-refresh"
                severity="warning"
                style="min-width: 2rem"
                @click="number()"
                class="ml-2"
              />
              <div class="flex justify-content-between align-items-center mb-5">
                <div class="col">
                  <Chart
                    type="bar"
                    v-if="chartmode == 1"
                    :data="charCusttData"
                    class="h-30rem"
                  />
                  <Chart
                    type="pie"
                    v-if="chartmode == 2"
                    :data="charCusttData"
                    class="h-30rem"
                  />
                  <Chart
                    type="line"
                    v-if="chartmode != 2 && chartmode != 1"
                    :data="charCusttData"
                    class="h-30rem"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 xl:col-6">
            <div class="surface-card shadow-2 border-round p-4">
              <span class="text-xl text-900 font-medium">Warehouse Chart</span>
              <div class="flex justify-content-between align-items-center mb-5">
                <div class="col">
                  <Chart type="bar" :data="chartWhData" class="h-30rem" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 xl:col-4">
            <div class="surface-card shadow-2 border-round p-4">
              <span class="text-xl text-900 font-medium"
                >warehouseshelf Chart</span
              >
              <div class="flex justify-content-between align-items-center mb-5">
                <div class="col">
                  <Chart type="bar" :data="chartWhshelfData" class="h-30rem" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 xl:col-4">
            <div class="surface-card shadow-2 border-round p-4">
              <span class="text-xl text-900 font-medium">Itemcode Chart</span>
              <div class="flex justify-content-between align-items-center mb-5">
                <div class="col">
                  <Chart type="bar" :data="chartItemData" class="h-30rem" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 xl:col-4">
            <div class="surface-card shadow-2 border-round p-4">
              <span class="text-xl text-900 font-medium"
                >Document Type Chart</span
              >
              <div class="flex justify-content-between align-items-center mb-5">
                <div class="col">
                  <Chart type="bar" :data="chartDoctyp" class="h-30rem" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="grid">
        <div class="col">
          <Chart type="bar" :data="charCusttData" class="h-30rem" />
        </div>
        <div class="col">
          <Chart type="bar" :data="chartWhData" class="h-30rem" />
        </div>
        <div class="col">
          <Chart type="bar" :data="chartWhshelfData" class="h-30rem" />
        </div>
      </div>
      <div class="grid">
        <div class="col-4">
          <Chart type="bar" :data="chartItemData" class="h-30rem" />
        </div>
        <div class="col-4 col-offset-4">
          <Chart type="bar" :data="chartDoctyp" class="h-30rem" />
        </div>
        <div class="col-4"></div>
      </div> -->

      <!-- <Chart type="bar" :data="chartWhData" :options="chartOptions" /> -->
      <div class="flex">
        <div class="card flex-1 justify-content-center p-3">
          <DataTable
            :value="chartCust"
            :paginator="true"
            :rows="10"
            :filters.sync="filterscust"
            filterDisplay="menu"
            :loading="loadingCust"
            class="p-datatable-sm"
            responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Button icon="pi pi-file" label=" graph" @click="pushchartCust" />
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">CustCode</h5>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filterscust['global'].value"
                    placeholder="Search"
                  />
                </span>
              </div>
            </template>
            <template #empty> </template>
            <template #loading> รอแป๊ปกำลังโหลด.... </template>
            <Column field="custcode" header="custcode"></Column>
            <Column field="sumamount" header="sumamount"></Column>
          </DataTable>
        </div>
        <div class="card flex-1 justify-content-center p-3">
          <DataTable
            :value="chartWh"
            :paginator="true"
            :rows="10"
            :filters.sync="filterswh"
            filterDisplay="menu"
            :loading="loadingWh"
            class="p-datatable-sm"
            responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Button
              icon="pi pi-file"
              label=" Warehouse"
              @click="pushchartWhData"
            />
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">Warehouse</h5>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filterswh['global'].value"
                    placeholder="Search"
                  />
                </span>
              </div>
            </template>
            <template #empty> </template>
            <template #loading> รอแป๊ปกำลังโหลด.... </template>
            <Column field="whcode" header="whcode"></Column>
            <Column field="sumamount" header="sumamount"></Column>
          </DataTable>
        </div>
        <div class="card flex-1 justify-content-center p-3">
          <DataTable
            :value="chartWhshelf"
            :paginator="true"
            :rows="10"
            :filters.sync="filterswhshelf"
            filterDisplay="menu"
            :loading="loadingWhshelf"
            class="p-datatable-sm"
            responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Button
              icon="pi pi-file"
              label=" warehouseshelf"
              @click="pushchartWhshelfData"
            />
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">warehouseshelf</h5>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filterswhshelf['global'].value"
                    placeholder="Search"
                  />
                </span>
              </div>
            </template>
            <template #empty> </template>
            <template #loading> รอแป๊ปกำลังโหลด.... </template>
            <Column field="whcode" header="whcode"></Column>
            <Column field="shelfcode" header="shelfcode"></Column>
            <Column field="sumamount" header="sumamount"></Column>
          </DataTable>
        </div>
        <div class="card flex-1 justify-content-center p-3">
          <DataTable
            :value="chartDoctype"
            :paginator="true"
            :rows="10"
            :filters.sync="filtersdoc"
            filterDisplay="menu"
            :loading="loadingDoc"
            class="p-datatable-sm"
            responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Button icon="pi pi-file" label=" DocType" @click="pushDocType" />
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">DocType</h5>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filtersdoc['global'].value"
                    placeholder="Search"
                  />
                </span>
              </div>
            </template>
            <template #empty> </template>
            <template #loading> รอแป๊ปกำลังโหลด.... </template>
            <Column field="doctype" header="doctype"></Column>
            <Column field="sumamount" header="sumamount"></Column>
          </DataTable>
        </div>
      </div>

      <div class="flex">
        <div class="card flex-1 justify-content-center p-3">
          <DataTable
            :value="chartItem"
            :paginator="true"
            :rows="10"
            :filters.sync="filtersitem"
            filterDisplay="menu"
            :loading="loadingItem"
            class="p-datatable-sm"
            responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Button
              icon="pi pi-file"
              label=" Doctypechart"
              @click="pushchartitem()"
            />
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">ItemCode</h5>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filtersitem['global'].value"
                    placeholder="Search"
                  />
                </span>
              </div>
            </template>
            <template #empty> </template>
            <template #loading> รอแป๊ปกำลังโหลด.... </template>
            <Column field="itemcode" header="itemcode"></Column>
            <Column field="qty" header="qty"></Column>
            <Column field="discountamount" header="discount"></Column>
            <Column field="sumamount" header="sumamount"></Column>
            <Column field="sumofcost" header="sumofcost"></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        v-model:visible="visible"
        header="Header"
        :style="{ width: '50vw' }"
        :position="position"
        :modal="true"
        :draggable="false"
      >
        <div class="p-fluid grid">
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="fromdate" />
              <label>fromdate</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="todate" />
              <label>fromdate</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <Dropdown
                v-model="doctype"
                :options="chartDoctype"
                optionLabel="doctype"
                placeholder="Select a City"
                class="w-full md:w-14rem"
                :editable="true"
              />
              <label>doctype</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <!-- <InputText type="text" v-model="custcode" /> -->
              <InputText type="text" v-model="custcode" />
              <!-- <Dropdown
                v-model="custcode"
                :options="chartCust"
                optionLabel="custcode"
                optionValue="custcode"
                placeholder="Select a City"
                class="w-full md:w-14rem"
                :editable="true"
              /> -->
              <label>custcode</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="inquiry" />
              <label>inquiry</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="vattype" />
              <label>vattype</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="ispos" />
              <label>ispos</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="itemcode" />
              <label>itemcode</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="whcode" />
              <label>whcode</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="shelfcode" />
              <label>shelfcode</label>
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-float-label">
              <InputText type="text" v-model="salecode" />
              <label>salecode</label>
            </span>
          </div>
          <Button
            label="ประมวลผล"
            icon="pi pi-play"
            iconPos="left"
            @click="getDashboard()"
          />
        </div>
      </Dialog>
    </MainContentWarp>
  </AppLayout>
</template>
