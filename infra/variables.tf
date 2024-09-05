variable "BUCKET_NAME" {
  description = "Name of S3 bucket"
  type        = string
  default = "kutticms-bucket"
}

variable "ACCESS_KEY" {
  description = "Access key for AWS"
  type = string
  default = "test"
}

variable "SECRET_KEY" {
  description = "Secret key for AWS"
  type = string 
  default = "test"
}

variable "S3_LOCATION" {
  description = "AWS S3 Bucket location"
  type = string
  default = "http://localhost:4566"
}

variable "REGION" {
  description = "AWS Region"
  type = string
  default = "ap-south-1"
}