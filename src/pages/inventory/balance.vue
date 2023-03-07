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
import $ from "jquery";

const router = useRouter();
const code_detail = ref("");
const storeApp = useApp();
const storeLang = useLang();
const toast = useToast();
const email = ref("");
const products = ref(null);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const loading = ref(true);

statuses: [
  "unqualified",
  "qualified",
  "new",
  "negotiation",
  "renewal",
  "proposal",
];

onMounted(() => {
  storeApp.setPageTitle("รายงานสินค้าคงเหลือ");
  storeApp.setActivePage("balance");
  storeApp.setActiveChild("");
  checkActiveLang();
  getBalanceReport();
});

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
function sendPDF(){
  if(email.value!=""){
  ReportService.sendEmailPDF(email.value)
    .then((res) => {
      console.log(res);
      if (res.success) {
        toast.add({
        severity: "success",
        summary: "Success",
        detail: 'ส่ง PDF สำเร็จ',
        life: 3000,
      });
      }else{

      toast.add({
        severity: "error",
        summary: "Error",
        detail: 'ส่ง PDF Error',
        life: 3000,
      });
      }
    })
    .catch((err) => {
      console.log(err);
    
      toast.add({
        severity: "error",
        summary: "Error",
        detail: 'ส่ง PDF Error',
        life: 3000,
      });
    });
  }
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
                <template #header>
                  <div class="flex justify-content-between align-items-center">
                    <Button icon="pi pi-file" label="PDF" @click="sendPDF" />
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
                </Column>
              </DataTable>
            </template>
          </Card>
        </div>
      </div>
    </MainContentWarp>
  </AppLayout>
</template>
