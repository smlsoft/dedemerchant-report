import { instanceApireport, instanceApi } from "@/services/ProviderService";

export default {
  getBalanceReport() {
    return instanceApireport()
      .get(`/api/balance`)
      .then((res) => res.data);
  },
  getSaleReport(fromdate, todate) {
    return instanceApireport()
      .get(`/api/sale?fromdate=${fromdate}&todate=${todate}`)
      .then((res) => res.data);
  },
  getSaleReportMode(mode,fromdate, todate,doctype,custcode,inquiry,vattype,ispos,itemcode,whcode,shelfcode,salecode) {
    return instanceApireport()
      .get(`/api/sale?fromdate=${fromdate}&todate=${todate}&mode=${mode}&doctype=${doctype}&custcode=${custcode}&inquiry=${inquiry}&vattype=${vattype}&ispos=${ispos}&itemcode=${itemcode}&whcode=${whcode}&shelfcode=${shelfcode}&salecode=${salecode}`)
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
