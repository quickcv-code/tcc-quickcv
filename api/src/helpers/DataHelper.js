module.exports = {

    formataData(data){
        partes = data.split('/');
        return new Date(partes[2], partes[1] - 1, partes[0]);
    },

    prazoVencido(prazo){
        return prazo >= Date.now() ? true : false;
    },

    dataParaString(data){
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}