
REM BACKOFFICE !!!!!!!!!!!!

REM VISUAL STUDIO -> MENU TOOLS -> NuGet Package Manager -> Package Manager Console (OBS.: ESCOLHER O PROJETO REPOSITORY no combobox)

Scaffold-DbContext "Server=AWSBR7DVBMBDB01.aws.mc1.br;Database=BO_WTM_BIMBO_DEV2;Integrated Security=true;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir DBContext -Context "DbContextBimbo" -Tables dbo.Mc1_GeneralDescription, dbo.Mc1_State, dbo.Mc1_City, dbo.Mc1_User, dbo.Mc1_UserKey, dbo.Mc1_Parameter,  dbo.MC1_BranchInvoice, dbo.MC1_BranchInvoiceExt,  dbo.MC1_Territory,  dbo.MC1_UserTerritory, dbo.MC1_UserExt, dbo.MC1_GeneralDescription, dbo.MC1_BranchInvoiceTerritory, dbo.Mc1Communication, dbo.MC1_CustomerDivisionSector, dbo.MC1_Order, dbo.MC1_Customer, dbo.MC1_CustomerExt, dbo.MC1_Invoice, dbo.MC1_OrderItem, dbo.MC1_OrderItemExt, dbo.MC1_Product, dbo.MC1_ProductDescription, dbo.MC1_ProductExt, dbo.MC1_StockBalanceBranchInvoiceExt, dbo.MC1_ProductLang, dbo.MC1_TerritoryVehicleExt, dbo.MC1_StockControlItemExt, dbo.MC1_HTMLTemplate, dbo.MC1_BilletCustomerNumberExt, dbo.MC1_CNABParameter, dbo.MC1_Company, dbo.mc1_CustomerBaseExt, dbo.MC1_Address, dbo.MC1_PaymentCondition, dbo.MC1_Billet, dbo.Mc1_OrderInvoice, dbo.MC1_Configuration, dbo.Mc1_OrderItemDetail, dbo.Mc1_OrderExt, dbo.Mc1_InvoiceExt, dbo.Mc1_CustomerDivisionSectorExt, dbo.MC1_InvoiceRequestEmites, dbo.MC1_DocumentTemplate,  dbo.MC1_BilletJsonResponse, dbo.MC1_BilletResponseCobrato, MC1_Liquidate, MC1_LiquidateExt, MC1_StockControl, MC1_StockControlExt, MC1_InvoiceResponseEmites, MC1_FactoryChargeReturnExt, mc1_NatureOperationDefaultExt, MC1_StockBalance, MC1_LiquidateTrip, MC1_StockControlItem, MC1_InvoiceItemExt, MC1_InvoiceRIExt, MC1_InvoiceItemRIExt, MC1_InvoiceReferenceRIExt, MC1_CustomerParameterExt, MC1_ProductUnitMeasure, MC1_InvoiceNumberExt, MC1_BilletDiscountExt, MC1_CustomerTerritory, MC1_LOG_EDI_Ext, MC1_Log, MC1_FactoryChargeReturnExt, MC1_FactoryChargeReturnProductExt, MC1_LoadDocumentExt, MC1_LoadDocumentProductExt, MC1_InvoiceItem, MC1_InvoiceItemDetail, MC1_InvoiceReferenceExt, MC1_PriceT610, MC1_PriceT611, MC1_PriceT620, MC1_PriceT621, MC1_PriceT630, MC1_PriceT631, MC1_PriceT633, MC1_PriceT710, MC1_PriceT711, MC1_PriceT810, MC1_PriceT811, MC1_PriceT910, MC1_PriceT911, MC1_PriceM510, MC1_InteractionConfig, MC1_InteractionGroup, MC1_InteractionGroupExt, MC1_NatureOperationBraExt, MC1_PriceA801, MC1_OrderObservation, MC1_InvoiceProvider, MC1_ProductBranchInvoiceExt, MC1_OrderEquipamentItemExt -Force 


REM VISUAL STUDIO CONSOLE
dotnet ef dbcontext scaffold  "Server=AWSBR4DQCLIDB02.AWS.MC1.BR;Database=BO_WTM_BIMBO_DEV;Integrated Security=true;" Microsoft.EntityFrameworkCore.SqlServer -o DBContext -c "DbContextBimbo" -t dbo.Mc1_GeneralDescription, dbo.Mc1_State, dbo.Mc1_City, dbo.Mc1_User, dbo.Mc1_UserKey, dbo.Mc1_Parameter,  dbo.MC1_BranchInvoice,  dbo.MC1_Territory,  dbo.MC1_UserTerritory, dbo.MC1_UserExt, dbo.MC1_GeneralDescription, dbo.MC1_BranchInvoiceTerritory, dbo.Mc1Communication, dbo.MC1_CustomerDivisionSector, dbo.MC1_Order, dbo.MC1_Customer, dbo.MC1_CustomerExt, dbo.MC1_Invoice, dbo.MC1_OrderItem, dbo.MC1_Product, dbo.MC1_ProductDescription, dbo.MC1_ProductExt, dbo.MC1_StockBalanceBranchInvoiceExt, dbo.MC1_ProductLang, dbo.MC1_TerritoryVehicleExt, dbo.MC1_StockControlItemExt, dbo.MC1_HTMLTemplate, dbo.MC1_BilletCustomerNumberExt, dbo.MC1_CNABParameter, dbo.MC1_Company, dbo.mc1_CustomerBaseExt, dbo.MC1_Address, dbo.MC1_PaymentCondition, dbo.MC1_Billet, dbo.Mc1_OrderInvoice, dbo.MC1_Configuration, dbo.Mc1_OrderItemDetail, dbo.Mc1_OrderExt, dbo.Mc1_InvoiceExt, dbo.Mc1_CustomerDivisionSectorExt, dbo.MC1_InvoiceRequestEmites, dbo.MC1_DocumentTemplate,  dbo.MC1_BilletJsonResponse, dbo.MC1_BilletResponseCobrato, MC1_Liquidate, MC1_LiquidateExt  -Force  -v -f 

public DbContextBimbo(DbContextOptions<DbContextBimbo> options) : base(options){ }




REM ETL !!!!!!!!!!!!

REM DEV
Scaffold-DbContext "Server=AWSBR7DVBMBDB01.aws.mc1.br;Database=BO_WTM_ETL_BIMBO_DEV2;Integrated Security=true;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir DBContextEtl -Context "DbContextBimboEtl" -Tables  ETL_NEOGRID_ENCABEZADO, ETL_NEOGRID_DETALLE, ETL_NEOGRID_OBSERVACIONES, ETL_EXTENSIBLES, ETL_INVPCINTER_INV_OUT -Force 

REM PROD
Scaffold-DbContext "Server=AWSBR7PDCLIDB09.AWS.MC1.BR;Database=BO_WTM_ETL_BIMBO2;Integrated Security=true;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir DBContextEtl -Context "DbContextBimboEtl" -Tables  ETL_NEOGRID_ENCABEZADO, ETL_NEOGRID_DETALLE, ETL_NEOGRID_OBSERVACIONES, ETL_EXTENSIBLES, ETL_INVPCINTER_INV_OUT -Force 


public DbContextBimboEtl(DbContextOptions<DbContextBimboEtl> options) : base(options){ }