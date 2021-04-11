using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TokaInternacional.Models
{
    public partial class TokaInternacionalContext : DbContext
    {
        public TokaInternacionalContext()
        {
        }

        public TokaInternacionalContext(DbContextOptions<TokaInternacionalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TbPersonasFisicas> TbPersonasFisicas { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLDELL;Database=TokaInternacional;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TbPersonasFisicas>(entity =>
            {
                entity.HasKey(e => e.IdPersonaFisica);

                entity.ToTable("Tb_PersonasFisicas");

                entity.Property(e => e.Activo).HasDefaultValueSql("((1))");

                entity.Property(e => e.ApellidoMaterno)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ApellidoPaterno)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.FechaRegistro)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rfc)
                    .HasColumnName("RFC")
                    .HasMaxLength(13)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsuarios)
                    .HasName("PK__Usuarios__3940559A2CA0A8EE");

                entity.Property(e => e.IdUsuarios).HasColumnName("idUsuarios");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fechaCreacion")
                    .HasColumnType("datetime");

                entity.Property(e => e.NombreUsuario)
                    .HasColumnName("nombreUsuario")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
