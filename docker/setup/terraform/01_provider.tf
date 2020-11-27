# Configure Azure storage to manage Terraform State
# ref: https://docs.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage
terraform {
  backend "azurerm" {
    resource_group_name   = "tstate"
    storage_account_name  = "tstate09762"
    container_name        = "tstate"
    key                   = "terraform.tfstate"
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  # The "feature" block is required for AzureRM provider 2.x. 
  # If you're using version 1.x, the "features" block is not allowed.
  version = "=2.23.0"

  subscription_id = var.SUBSCRIPTION_ID
  client_id       = var.SP_APPID
  client_secret   = var.SP_PASSWORD
  tenant_id       = var.SP_TENANT

  features {}
}