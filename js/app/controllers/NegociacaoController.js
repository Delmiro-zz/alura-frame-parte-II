class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
              
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            ['adiciona', 'limpa']
        );
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            ['texto']
        );        
               
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();   
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    _limpaListaDataTable(){
        
        this._listaNegociacoes.limpa();
        this._mensagem.texto = '';
    }

    importaNegociacoes(){
        let service = new NegociacoesService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes =>{
            negociacoes.reduce((arrayAuxiliar, arrayOriginal) => arrayAuxiliar.concat(arrayOriginal),[])
            .forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
            this._mensagem.texto = 'Negociações importadas com sucesso';    
        }).catch(error => this._mensagem.texto = error);
    }

}