namespace Extrato.Models
{
    public class Lancamento
    {
        public long Id { get; set; }
        public String? Descricao { get; set; }
        public DateTime? Data { get; set; }
        public long Valor {  get; set; }
        public bool Avulso {  get; set; }
        public bool Status {  get; set; }
    }
}
