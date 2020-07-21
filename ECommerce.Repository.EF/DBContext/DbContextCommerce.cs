using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ECommerce.Repository.EF.DBContext
{
    public partial class DbContextCommerce : DbContext
    {
        public DbContextCommerce()
        {
        }

        public DbContextCommerce(DbContextOptions<DbContextCommerce> options)
            : base(options)
        {
        }

        public virtual DbSet<TbCustomer> TbCustomer { get; set; }
        public virtual DbSet<TbOrder> TbOrder { get; set; }
        public virtual DbSet<TbOrderItem> TbOrderItem { get; set; }
        public virtual DbSet<TbProduct> TbProduct { get; set; }
        public virtual DbSet<TbUser> TbUser { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<TbCustomer>(entity =>
            {
                entity.HasKey(e => e.CIdcustomer)
                    .HasName("PK__TB_Custo__500F39894DE53F0A");

                entity.ToTable("TB_Customer");

                entity.Property(e => e.CIdcustomer)
                    .HasColumnName("cIDCustomer")
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CCustomerName)
                    .IsRequired()
                    .HasColumnName("cCustomerName")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LEnabled).HasColumnName("lEnabled");

                entity.Property(e => e.XCustomerType)
                    .IsRequired()
                    .HasColumnName("xCustomerType")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbOrder>(entity =>
            {
                entity.HasKey(e => e.CIdorder)
                    .HasName("PK__TB_Order__0A726F2B754E0F7E");

                entity.ToTable("TB_Order");

                entity.Property(e => e.CIdorder).HasColumnName("cIDOrder");

                entity.Property(e => e.CIdcustomer)
                    .HasColumnName("cIDCustomer")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DCreated)
                    .HasColumnName("dCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.LEnabled).HasColumnName("lEnabled");

                entity.Property(e => e.NTotalValue)
                    .HasColumnName("nTotalValue")
                    .HasColumnType("numeric(5, 2)");

                entity.HasOne(d => d.CIdcustomerNavigation)
                    .WithMany(p => p.TbOrder)
                    .HasForeignKey(d => d.CIdcustomer)
                    .HasConstraintName("FK_Customer_Order");
            });

            modelBuilder.Entity<TbOrderItem>(entity =>
            {
                entity.HasKey(e => e.CIdorder)
                    .HasName("PK__TB_Order__0A726F2BF1CB7C76");

                entity.ToTable("TB_OrderItem");

                entity.Property(e => e.CIdorder)
                    .HasColumnName("cIDOrder")
                    .ValueGeneratedNever();

                entity.Property(e => e.CIdproduct)
                    .IsRequired()
                    .HasColumnName("cIDProduct")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LEnabled).HasColumnName("lEnabled");

                entity.Property(e => e.NAmount).HasColumnName("nAmount");

                entity.Property(e => e.NTotalValue)
                    .HasColumnName("nTotalValue")
                    .HasColumnType("numeric(5, 2)");

                entity.Property(e => e.NUnitValue)
                    .HasColumnName("nUnitValue")
                    .HasColumnType("numeric(5, 2)");

                entity.HasOne(d => d.CIdorderNavigation)
                    .WithOne(p => p.TbOrderItem)
                    .HasForeignKey<TbOrderItem>(d => d.CIdorder)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItem_Order");

                entity.HasOne(d => d.CIdproductNavigation)
                    .WithMany(p => p.TbOrderItem)
                    .HasForeignKey(d => d.CIdproduct)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItem_Product");
            });

            modelBuilder.Entity<TbProduct>(entity =>
            {
                entity.HasKey(e => e.CIdproduct)
                    .HasName("PK__TB_Produ__6C1FC4CA64C39C66");

                entity.ToTable("TB_Product");

                entity.Property(e => e.CIdproduct)
                    .HasColumnName("cIDProduct")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CProductName)
                    .IsRequired()
                    .HasColumnName("cProductName")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LEnabled).HasColumnName("lEnabled");
            });

            modelBuilder.Entity<TbUser>(entity =>
            {
                entity.HasKey(e => e.CIduser)
                    .HasName("PK__TB_User__531C6E8254388F67");

                entity.ToTable("TB_User");

                entity.Property(e => e.CIduser).HasColumnName("cIDUser");

                entity.Property(e => e.CEmail)
                    .IsRequired()
                    .HasColumnName("cEmail")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CPassWord)
                    .IsRequired()
                    .HasColumnName("cPassWord")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CUserName)
                    .IsRequired()
                    .HasColumnName("cUserName")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LEnabled).HasColumnName("lEnabled");
            });
        }
    }
}
