use wasm_bindgen::prelude::*;
use std::fs::File;
use ibig::{ibig, modular::ModuloRing, ubig, UBig};
use serde::{Serialize, Deserialize};
use ndarray::{Array, Array2, Array1, array};
use ndarray_csv::{Array2Reader, Array2Writer};
use csv::{ReaderBuilder, WriterBuilder};
use std::io::BufReader;
use std::error::Error;
use std::path::Path;
use serde_derive::Serialize;
use serde_derive::Deserialize;
use std::io::prelude::*;
use std::io;
extern crate serde_json;

#[derive(Serialize, Deserialize)]
pub struct Inp {
    pub field1: Vec<usize>
}

#[derive(Serialize, Deserialize)]
pub struct Out {
    pub field1: Vec<f64>,
    pub field2: Vec<f64>
}

//Probability Functions
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


//Wordle Functions
fn generate_word_score(matrix: &Array2<usize>, word: usize, indices: &Array1<usize>) -> f64{
    
    //Generates the distrbution of patterns for the given word
    let mut distribution = Array1::<f64>::zeros((3 as usize).pow(5));
    for i in indices {
        let pattern = matrix[[word,*i]];
        distribution[[pattern]]+=1.0;
    }

    //generates the score of each word based on its probability
    let mut score = 0.0;
    for i in 0..distribution.len() {
        let mut p: f64 = distribution[i]/(indices.len() as f64);
        if p == 0.0 {p = 1.0};
        score += p*(1.0/p).log2();
        
    }
    
    return score
}


fn generate_top_ten_for(matrix: &Array2<usize>, indices: Array1<usize>) -> Vec<Vec<f64>> {
    let mut scores: Vec<f64> = vec![0.0;10];
    let mut words: Vec<f64> = vec![0.0;10];
    
    for i in &indices {
        
        let score = generate_word_score(&matrix, *i, &indices);
        let mut pos = scores.iter().position(|x| x < &score);
        if score == 0.0 {
            pos = Some(0);
        }
        
        if pos != None {
            //pos = pos.unwrap();
            scores.insert(pos.unwrap(), score);
            words.insert(pos.unwrap(), *i as f64);
            scores.truncate(10);
            words.truncate(10);
        }
    }
    
    return vec![words,scores]
}

fn get_matrix(file_name: &str) -> Result<Array2<usize>, Box<dyn Error>> {
    
    

    let len1 = 12953;
    let path = Path::new(file_name);
    let file = File::open(file_name)?;
    let mut reader = ReaderBuilder::new().has_headers(false).from_reader(file);
    let array = reader.deserialize_array2((len1, len1))?;

    return Ok(array)

    

}

fn compute_words_left(guess: &Array1<usize>, outcomes: &Array1<usize>, matrix: &Array2<usize>) -> Array1<usize> {

    //let tern: Array1::<usize> = array![1, 3, 9, 27, 81];
    
    let mut indices = Array1::from_iter(0..matrix.ncols());
    if guess.len() == 0 {
        return indices;
    }
    for i in 0..guess.len() {
        
        let mut new_indices = vec![];
        let pattern = outcomes[[i]];
        
        for j in indices {  
           
            if matrix[[guess[i], j]] == pattern {
                new_indices.push(j);
            }
        }

        indices = Array1::from_vec(new_indices);
    }

    return indices
}

#[wasm_bindgen]
pub fn answer(words: JsValue, outcomes: JsValue) -> JsValue {
    
    let words: Vec<usize> = serde_wasm_bindgen::from_value(words).unwrap_throw();
    let outcomes: Vec<usize> = serde_wasm_bindgen::from_value(outcomes).unwrap();
    let test1 = vec![0.0];
    let test2 = vec![0.0];
    
    
    let words = Array::from_vec(words);
    let outcomes = Array::from_vec(outcomes);
    
    let test1 = vec![0.0];
    let test2 = vec![0.0];
    
    let len1 = 12953;
    let file_path = "matrix.csv";
    
    let array_read: Array2<usize> = get_matrix(file_path).unwrap();
    /*
    let indices = compute_words_left(&words, &outcomes, &array_read);

    let scores = generate_top_ten_for(&array_read, indices);

    let output = Out {
        field1: scores[0].clone(),
        field2: scores[1].clone()
    };
    log_f64(output.field1[0]);
    */
    let output_test = Out {
        field1: test1,
        field2: test2,
    };
    
    serde_wasm_bindgen::to_value(&output_test).unwrap()
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
