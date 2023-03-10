<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import MainContentWarp from "@/components/MainContentWarp.vue";
import { onMounted, ref } from "vue";
import { useApp } from "@/stores/app.js";
import ReportService from "@/services/ReportService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Chart from "primevue/chart";
const storeApp = useApp();
const charCusttData = ref(null);
const chartItemData = ref(null);
const chartWhshelfData = ref(null);
const chartWhData = ref(null);
const chartDoctyp = ref(null);
const chartItem = ref();
const chartCust = ref();
const chartWhshelf = ref();
const chartWh = ref();
const chartDoctype = ref();

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
  charCusttData.value = {
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
function pushDocType() {
  const data = chartDoctype.value;
  const labels = data.map((item) => item.doctype);
  const values = data.map((item) => item.sumamount);
  charCusttData.value = {
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
</script>

<template>
  <AppLayout>
    <MainContentWarp>
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
            <InputText type="text" v-model="doctype" />
            <label>doctype</label>
          </span>
        </div>
        <div class="field col-12 md:col-3">
          <span class="p-float-label">
            <InputText type="text" v-model="custcode" />
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
      </div>
      <div>
        <Button
          label="ประมวลผล"
          icon="pi pi-play"
          iconPos="left"
          @click="getDashboard()"
        />
      </div>
      <div>
        <Chart
          type="bar"
          :data="charCusttData"
          :options="chartOptions"
          class="h-30rem"
        />
      </div>
      <div>
        <Chart
          type="bar"
          :data="chartWhData"
          :options="chartOptions"
          class="h-30rem"
        />
      </div>
      <div>
        <Chart
          type="bar"
          :data="chartDoctype"
          :options="chartOptions"
          class="h-30rem"
        />
      </div>

      <div>
        <Chart
          type="bar"
          :data="chartWhshelfData"
          :options="chartOptions"
          class="h-30rem"
        />
      </div>
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
              @click="pushchartCust"
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
    </MainContentWarp>
  </AppLayout>
</template>
