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
