mod controllers;
mod routes;
mod postgres;

use actix_web::{App, HttpServer};
use dotenv::dotenv;
use std::env;
use crate::routes::routes::conf_routes;

async fn connected() -> impl Responder {
    HttpResponse::Ok().body("Connected to Postgres...")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    dotenv().ok();
    env::set_var("RUST_LOG", "actix_web=debug");

    let pool = postgres::get_pool();

    HttpServer::new(|| {
        App::new()
        .data(pool.clone())    
            .configure(conf_routes)
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}