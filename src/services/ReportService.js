import { instanceApireport, instanceApi } from "@/services/ProviderService";

export default {
  getBalanceReport() {
    //รายงานสิค้าคงเหลือ
    return instanceApireport()
      .get(`/api/balance`)
      .then((res) => res.data);
  },
  getproductdetail(Keyword) {
    //รายงานสิค้าคงเหลือ
    return instanceApireport()
      .get(
        `/api/productdetail?shopid=${"2Eh6e3pfWvXTp0yV3CyFEhKPjdl"}&keyword=${Keyword}&producttype=${"0"}&taxtype=${"0"}`
      )
      .then((res) => res.data);
  },
  getproductdetailbarcode(Keyword) {
    //รายงานสิค้าคงเหลือ
    return instanceApireport()
      .get(
        `/api/productbarcode?shopid=${"2Eh6e3pfWvXTp0yV3CyFEhKPjdl"}&keyword=${Keyword}&pricemember=${"0"}`
      )
      .then((res) => res.data);
  },
  getSaleReport(fromdate, todate) {
    //รายงานขาย
    return instanceApireport()
      .get(`/api/sale?fromdate=${fromdate}&todate=${todate}`)
      .then((res) => res.data);
  },
  getproductreport() {
    //รายงานสินค้า
    return instanceApi()
      .get(`/product`)
      .then((res) => res.data);
  },
  getSaleReportMode(
    mode,
    fromdate,
    todate,
    doctype,
    custcode,
    inquiry,
    vattype,
    ispos,
    itemcode,
    whcode,
    shelfcode,
    salecode
  ) {
    return instanceApireport()
      .get(
        `/api/sale?fromdate=${fromdate}&todate=${todate}&mode=${mode}&doctype=${doctype}&custcode=${custcode}&inquiry=${inquiry}&vattype=${vattype}&ispos=${ispos}&itemcode=${itemcode}&whcode=${whcode}&shelfcode=${shelfcode}&salecode=${salecode}`
      )
      .then((res) => res.data);
  },
  sendEmailPDF(email) {
    return instanceApireport()
      .post(`/sendPDFEmail`, email)
      .then((res) => res.data);
  },
  getproductreport() {
    return instanceApi()
      .get(`/product`)
      .then((res) => res.data);
  },
};
