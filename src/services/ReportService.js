import { instanceApi } from '@/services/ProviderService'

export default {
    getBalanceReport() {
        return instanceApi(true).get(`/getBalanceReport`).then(res => res.data);
    },
    sendEmailPDF(email){
        return instanceApi(true).post(`/messages?email=${email}`).then(res => res.data);
    }
}
