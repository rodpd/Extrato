using Microsoft.EntityFrameworkCore;

namespace Extrato.Models

{
    public class LancamentoContext : DbContext
    {
        public LancamentoContext(DbContextOptions<LancamentoContext> options) : base(options) { }

        public DbSet<Lancamento> Lancamentos { get; set; } = null!;
    }
}
