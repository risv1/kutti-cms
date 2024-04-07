use actix_web::web;
use crate::controllers::hello::{hello, echo};

pub fn conf_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(hello);
    cfg.service(echo);
}