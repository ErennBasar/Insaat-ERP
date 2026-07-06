using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InsaatERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class mig_4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PenaltyAmount",
                table: "Contracts",
                newName: "GuaranteePercentage");

            migrationBuilder.RenameColumn(
                name: "ExpiryDate",
                table: "Contracts",
                newName: "EndDate");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Contracts",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<decimal>(
                name: "AdvancePaymentPercentage",
                table: "Contracts",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "AiStatus",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ContractCode",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "ContractValue",
                table: "Contracts",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "CounterpartyName",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DocumentFilePath",
                table: "Contracts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaymentTermDays",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PenaltyRate",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "RevisionNumber",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Contracts",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WarrantyPeriodMonths",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdvancePaymentPercentage",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "AiStatus",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "ContractCode",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "ContractValue",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "CounterpartyName",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "DocumentFilePath",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "PaymentTermDays",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "PenaltyRate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "RevisionNumber",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "WarrantyPeriodMonths",
                table: "Contracts");

            migrationBuilder.RenameColumn(
                name: "GuaranteePercentage",
                table: "Contracts",
                newName: "PenaltyAmount");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Contracts",
                newName: "ExpiryDate");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
