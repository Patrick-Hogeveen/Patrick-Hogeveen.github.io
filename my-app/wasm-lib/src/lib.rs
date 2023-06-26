use wasm_bindgen::prelude::*;
use ibig::{ibig, modular::ModuloRing, ubig, UBig};
use serde::{Serialize, Deserialize};

#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_f64(a: f64);
}


fn factorials(n: usize) -> Vec<UBig> {
    let mut facts = Vec::new();
    facts.push(ubig!(1));

    for i in 1..=n {
        let previous = &facts[i-1];
        facts.push(previous*i);
    }

    return facts
}

#[wasm_bindgen]
pub fn probability(prob: f64, num_trials: usize, num_success: usize) -> f64{
    let list_of_factorials = factorials(num_trials);
    let chance = prob.powi(num_success as i32) * (1.0-prob).powi(num_trials as i32-num_success as i32);
    let curr_fact = &list_of_factorials[num_trials]/(&list_of_factorials[num_success]*&list_of_factorials[num_trials-num_success]);
    return chance*curr_fact.to_f64()
    
}



#[wasm_bindgen]
pub fn all_probability(prob: f64, num_trials: usize) -> JsValue {
    let list_of_factorials = factorials(num_trials);
    let mut list_of_probabilities: Vec<f64> = Vec::new();
    for n in 0..=num_trials {
        let chance = prob.powi(n as i32) * (1.0-prob).powi(num_trials as i32-n as i32);
        let curr_fact = &list_of_factorials[num_trials]/(&list_of_factorials[n]*&list_of_factorials[num_trials-n]);
        list_of_probabilities.push(chance*curr_fact.to_f64());
    }
    serde_wasm_bindgen::to_value(&list_of_probabilities).unwrap()
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
