<script setup>
import DialogForm from "@/components/widget/DialogForm.vue";
import AppLayout from "@/components/layout/AppLayout.vue";
import MainContentWarp from "@/components/MainContentWarp.vue";
import Utils from "@/utils/";
import ReportService from "@/services/ReportService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { ref, onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useApp } from "@/stores/app.js";
import { useLang } from "@/stores/lang.js";
import { useRouter } from "vue-router";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import Chart from "primevue/chart";
import $ from "jquery";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const isvisible = ref(false);
const showdia = ref(false);
const router = useRouter();
const code_detail = ref("");
const storeApp = useApp();
const storeLang = useLang();
const toast = useToast();
const email = ref("");
const products = ref(null);
const chartData = ref(null);
const location = ref("");
const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
  },
};
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const loading = ref(true);
pdfMake.fonts = {
  Sarabun: {
    normal:
      "https://fonts.gstatic.com/s/sarabun/v12/DtVjJx26TKEr37c9WBJDnlQN9gk.ttf",
    bold: "https://fonts.gstatic.com/s/sarabun/v12/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.ttf",
    italics:
      "https://fonts.gstatic.com/s/sarabun/v12/DtVhJx26TKEr37c9aBBJmnYI5gnOpg.ttf",
    bolditalics:
      "https://fonts.gstatic.com/s/sarabun/v12/DtVkJx26TKEr37c9aBBxJlks7iLSrwFUlw.ttf",
  },
};
statuses: [
  "unqualified",
  "qualified",
  "new",
  "negotiation",
  "renewal",
  "proposal",
];

onMounted(() => {
  storeApp.setPageTitle("รายงานรายละอียดสินค้า ตามกลุ่ม");
  storeApp.setActivePage("productdetailGroupReport");
  storeApp.setActiveChild("");
  checkActiveLang();
  getBalanceReport();
});

function createPDFData(products) {
  const content = [];

  // Define table header
  const tableHeader = [
    { text: "shopid", style: "tableHeader" },
    { text: "รหัส", style: "tableHeader", bold: true, font: "Sarabun" },
    { text: "ชื่อ", style: "tableHeader" },
    { text: "หน่วยนับ", style: "tableHeader" },
    { text: "คลัง", style: "tableHeader" },
    { text: "ที่เก็บ", style: "tableHeader" },
    { text: "QTY In", style: "tableHeader" },
    { text: "QTY Out", style: "tableHeader" },
    { text: "Balance", style: "tableHeader" },
  ];

  // Define table body
  const tableBody = products.map((product) => [
    product.shopid,
    product.ic_code,
    product.ic_name,
    product.ic_unit_code,
    product.warehouse,
    product.location,
    product.qty_in,
    product.qty_out,
    product.balance_qty,
  ]);

  content.push({
    text: "รายงานสินค้าคงเหลือ",
    style: "header",
    alignment: "center",
  });

  content.push({
    style: "tableExample",
    table: {
      widths: [
        "15.11%",
        "11.11%",
        "15.11%",
        "13.11%",
        "11.11%",
        "11.11%",
        "9%",
        "9%",
        "9%",
      ],
      body: [tableHeader, ...tableBody],
    },
  });

  return {
    content: content,

    defaultStyle: {
      font: "Sarabun",
      fontSize: 10,

      color: "#0A065D",
    },

    styles: {
      header: {
        fontSize: 15,
        bold: true,
        margin: [0, 0, 0, 0],
      },
      table: {
        margin: [0, 0, 0, 0],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
        fillColor: "#f2f2f2",
      },
    },
    fonts: {
      Sarabun: {
        normal: "path/to/Sarabun-Regular.ttf",
        bold: "path/to/Sarabun-Bold.ttf",
        italics: "path/to/Sarabun-Italic.ttf",
        bolditalics: "path/to/Sarabun-BoldItalic.ttf",
      },
    },
  };
}
function generatePDF() {
  showdia.value = true;
  isvisible.value = true;
  const pdfData = createPDFData(products.value);

  pdfMake.createPdf(pdfData).getDataUrl(function (dataUrl) {
    const iframe = document.querySelector("#iframeContainer");
    iframe.src = dataUrl;
  });
}

function getBalanceReport() {
  ReportService.getBalanceReport()
    .then((res) => {
      console.log(res);
      if (res.success) {
        products.value = res.data;

        loading.value = false;
      }
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Error",
        detail: err,
        life: 3000,
      });
    });
}
function push() {
  const data = products.value;
  const labels = data.map((item) => item.ic_name);
  const values = data.map((item) => item.qty_in);
  chartData.value = {
    labels,
    datasets: [
      {
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

function checkActiveLang() {
  console.log(storeLang.languages);
  storeLang.languages.forEach((ele) => {});
}

function getLangName(data) {
  var result = storeLang.languages.filter((x) => x.code == data);

  if (result.length > 0) {
    return result[0].name;
  } else {
    return "";
  }
}
function sendPDF() {
  if (email.value != "") {
    ReportService.sendEmailPDF(email.value)
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "ส่ง PDF สำเร็จ",
            life: 3000,
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "ส่ง PDF Error",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        toast.add({
          severity: "error",
          summary: "Error",
          detail: "ส่ง PDF Error",
          life: 3000,
        });
      });
  }
}

function onClose() {
  showdia.value = false;
}
function goTo(path, param) {
  if (param != "") {
    router.push({ name: path, params: { id: param } });
  } else {
    router.push({ name: path });
  }
}
</script>

<template>
  <AppLayout>
    <MainContentWarp id="mainDiv">
      <div class="grid mt-2">
        <div class="col-12">
          <InputText type="text" v-model="email" />
          <Card>
            <template #title>
              {{ storeApp.PageTitle }}
            </template>
            <template #content>
              <DataTable
                :value="products"
                :paginator="true"
                class="p-datatable-products"
                :rows="25"
                :rowHover="true"
                v-model:filters="filters"
                filterDisplay="menu"
                :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="จาก {first} ถึง {last} ทั้งหมด {totalRecords} รายการ"
                responsiveLayout="scroll"
              >
                <!-- <template #header>
                  <div class="flex justify-content-between align-items-center">
                    <Button icon="pi pi-file" label="PDF" @click="sendPDF" />
                    <Button
                      icon="pi pi-file"
                      label="Preview PDF"
                      @click="generatePDF"
                    />
                    <Button icon="pi pi-file" label=" graph" @click="push" />
                    <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText
                        v-model="filters['global'].value"
                        placeholder="Keyword Search"
                      />
                    </span>
                  </div>
                </template>
                <template #empty> ไม่พบข้อมูล </template>
                <template #loading> กำลังโหลดข้อมูลกรุณารอซักครู่ </template>
                <Column field="shopid" header="shopid" sortable></Column>
                <Column field="ic_code" header="รหัส" sortable> </Column>
                <Column field="ic_name" header="ชื่อ" sortable> </Column>
                <Column field="ic_unit_code" header="หน่วยนับ" sortable>
                </Column>
                <Column field="warehouse" header="คลัง" sortable> </Column>
                <Column field="location" header="ที่เก็บ" sortable> </Column>
                <Column field="qty_in" header="QTY In" sortable>
                  <template #body="{ data }">
                    {{ Utils.formatCurrency(data.qty_in) }}
                  </template>
                </Column>
                <Column field="qty_out" header="QTY Out" sortable>
                  <template #body="{ data }">
                    {{ Utils.formatCurrency(data.qty_out) }}
                  </template>
                </Column>
                <Column field="balance_qty" header="Balance" sortable>
                  <template #body="{ data }">
                    {{ Utils.formatCurrency(data.balance_qty) }}
                  </template>
                </Column> -->
              </DataTable>
            </template>
          </Card>
          <div class="col-12">
            <!-- <div class="col-6">
              <Chart
                type="polarArea"
                :data="chartData"
                :options="chartOptions"
              />
            </div> -->
          </div>
        </div>
      </div>

      <!-- <div class="col-12" v-if="isvisible">
        <iframe
          class="w-full overflow-auto surface-overlay"
          style="height: 90vh"
          id="iframeContainer"
        ></iframe>
      </div> -->
      <Dialog
        :visible="showdia"
        @update:visible="onClose"
        header="Preview PDF"
        :modal="true"
        :style="{ width: '50vw' }"
      >
        <iframe
          class="w-full overflow-auto surface-overlay"
          style="width: 50vh; height: 100vh"
          id="iframeContainer"
        ></iframe>
      </Dialog>
    </MainContentWarp>
  </AppLayout>
</template>
