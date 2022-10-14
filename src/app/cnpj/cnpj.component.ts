import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CnpjService } from './cnpj.service';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css'],
})
export class CnpjComponent implements OnInit {
  buscacnpj: string = '';
  buscar: boolean = false;

  constructor(
    private cnpjService: CnpjService,
    private messageService: MessageService
  ) {}

  buscarCNPJ(buscacnpj: any, form: any) {
    if (buscacnpj != null && buscacnpj !== '') {
      this.cnpjService.consultaCnpj(buscacnpj).subscribe({
        next: (dados) => {
          console.log(dados);
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForm(dados, form);
          }, 100);
        },
        error: (e) => {
          this.resetaCNPJForm(form);
          console.log(e);
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar cnpj!',
          });
        },
      });
    }
  }

  populaCNPJForm(dados: any, formulario: any) {
    formulario.form.patchValue({
      cnpj: dados.cnpj,
      matrizFilial: dados.identificador_matriz_filial,
      descricaoMatrizFilial: dados.descricao_matriz_filial,
      razaoSocial: dados.razao_social,
      nomeFantasia: dados.nome_fantasia,
      situacaoCadastral: dados.situacao_cadastral,
      dataSituacaoCadastral: dados.data_situacao_cadastral,
      nomeCidadeExterior: dados.nome_cidade_exterior,
      dataInicioAtividade: dados.data_inicio_atividade,
      cnaeFiscal: dados.cnae_fiscal,
      logradouro: dados.logradouro,
      numero: dados.numero,
      complemento: dados.complemento,
      bairro: dados.bairro,
      municipio: dados.municipio,
      cep: dados.cep,
      uf: dados.uf,
      dddTelefone1: dados.ddd_telefone_1,
      dddTelefone2: dados.ddd_telefone_2,
      capitalSocial: dados.capital_social,
    });
  }

  resetaCNPJForm(formulario: any) {
    formulario.form.patchValue({
      cnpj: null,
      matrizFilial: null,
      descricaoMatrizFilial: null,
      razaoSocial: null,
      nomeFantasia: null,
      situacaoCadastral: null,
      dataSituacaoCadastral: null,
      nomeCidadeExterior: null,
      dataInicioAtividade: null,
      cnaeFiscal: null,
      logradouro: null,
      numero: null,
      complemento: null,
      bairro: null,
      municipio: null,
      cep: null,
      uf: null,
      dddTelefone1: null,
      dddTelefone2: null,
      capitalSocial: null,
    });
  }

  ngOnInit() {}
}
