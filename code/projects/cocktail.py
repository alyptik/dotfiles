#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jun  7 00:28:28 2017

@author: gebruiker
"""

import json
import random

ignore_list = [
    "cocktailkirsche", # dekoration
    "cocktailtomate",
    "kaffeebohnen",
    "karambolenscheibe",
    "kekse",
    "kokosnuss",
    "limettenscheibe",
    "limquats",
    "olive",
    "orangenschale",
    "orangenscheibe",
    "rosenbluete",
    "salzstangen",
    "schokoliertekaffeebohnen",
    "schokoladeausgruenem tee",
    "staudensellerie",
    "stielkirsche",
    "waffeln",
    "zitronengras",
    "wasser", # trivial
    "essig",
    "oel",
    "pfeffer",
    "salz",
    "zucker",
    "obst", # zu allgemein
    "fruechte",
    "likoer",
    "saftvontropischenfruechten",
    "obstler",
    "fruchtsaft",
    "beeren",
    "sirup",
    "fruechteausdemrumtopf",
    "suessigkeiten",
    "schnaps"
]

ingredients_special = {
    "ananasblaetter" : "ananas",
    "ananassaft" : "ananas",
    "ananasschnitz" : "ananas",
    "angosturabitter" : "angostura",
    "apfelmus" : "apfel",
    "apfelsaft" : "apfel",
    "aprikosensaft" : "aprikose",
    "aroma" : "orangenbluetenwasser",
    "bananensaft" : "banane",
    "birnensaft" : "birne",
    "brombeersaft" : "brombeeren",
    "champagner" : "sekt",
    "dunklerrum" : "braunerrum",
    "eigelb" : "ei",
    "eiweiss" : "ei",
    "erdbeersaft" : "erdbeeren",
    "espresso" : "kaffeepulver",
    "granatapfelsaft" : "granatapfel",
    "grapefruitsaft" : "grapefruit",
    "himbeersaft" : "himbeeren",
    "joghurt" : "naturjoghurt",
    "johannisbeersaft" : "johannisbeeren",
    "kaffee" : "kaffeepulver",
    "kakaopulver" : "kakao",
    "kirschsaft" : "kirsche",
    "limettensaft" : "limette",
    "limettenschale" : "limette",
    "limonade" : "zitronenlimonade",
    "litschisaft" : "litschi",
    "mangosaft" : "mango",
    "melone" : "wassermelone",
    "melonensaft" : "melone",
    "milchschaum" : "milch",
    "moehrensaft" : "moehre",
    "orangensaft" : "orange",
    "pfirsichmus" : "pfirsiche",
    "pfirsichsaft" : "pfirsich",
    "pflaumensaft" : "pflaumen",
    "prosecco" : "sekt",
    "sauerkirschsaft" : "sauerkirschen",
    "schokoladenraspel" : "schokolade",
    "schokoriegel" : "schokolade",
    "schokostreusel" : "schokolade",
    "suessesahne" : "sahne",
    "tee" : "rooibushtee",
    "tomatensaft" : "tomate",
    "traubensaft" : "weintrauben",
    "vanillezucker" : "vanillenmark",
    "schokolade" : "weisseschokolade",
    "zitronensaft" : "zitrone",
    "zitronenschale" : "zitrone"
}

ingredients_equivalent = {
    "apfeldirektsaft" : "apfelsaft",
    "brandy" : "weinbrand",
    "cremefine" : "sahne",
    "crushedice" : "eiswuerfel",
    "fanta" : "orangenlimonade",
    "grenadinesirup" : "grenadine",
    "ingwerwurzel" : "ingwer",
    "kirschnektar" : "kirschsaft",
    "kornbrand" : "korn",
    "lemonjuice" : "limettensaft",
    "maracujanektar" : "maracujasaft",
    "maraschinokirsche" : "cocktailkirsche",
    "meersalz" : "salz",
    "orangejuice" : "orangensaft",
    "perrier" : "mineralwasser",
    "pfirsichbrandy" : "pfirsichbrand",
    "proseccospumante" : "prosecco",
    "puderzucker" : "zucker",
    "redbull" : "energydrink",
    "sahneersatz" : "sahne",
    "singlemaltwhisky" : "whisky",
    "saftundzuckergemischt" : "sourdrinkmix",
    "sprite" : "zitronenlimonade",
    "suesserwermut" : "wermut",
    "suessstoff" : "zucker",
    "vanilleschote" : "vanillenmark"
}

# Nehme ein zusätzliches Bool um redundante strings zu ersetzen
def normalizeString(str, B):
    # 1) keine gross/kleinschreibung
    # 2) keine sonderzeichen: http://www.utf8-zeichentabelle.de/
    # 3) keine zusatzinformation (klammern, kommas)    
    str = str.replace("ä", "ae")
    str = str.replace("ö", "oe")
    str = str.replace("ü", "ue")
    str = str.replace("Ä", "Ae")
    str = str.replace("Ö", "Oe")
    str = str.replace("Ü", "ue")
    str = str.replace("ß", "ss")
    str = str.replace("-", "")
    str = str.replace("'", "")
    
    index = len(str)
    for i, s in enumerate(str):
        if s == "(":
            index = i-1
            break
        if s == ",":
            index = i
            break
    str = str.lower()[0:index]
    str = str.replace(" ", "")
    
    if B:
        # ersetze äquivalente ausdrücke anhand von ingredients_equivalent
        if str in ingredients_equivalent:
            str = ingredients_equivalent[str]
        # ersetze spezille ausdrücke anhand von ingredients_equivalent
        if str in ingredients_special:
            str = ingredients_special[str]
    return str

# Gesamtliste aller Zutaten (normalisiert)
def all_ingredients(recipes, B):
    ingredients = []
    
    for key1, value1 in recipes.items():
        for key2, value2 in value1.items():
            if key2 == "ingredients":
                for key3, value3 in value2.items():
                    key = normalizeString(key3, B)
                    if key not in ingredients:
                        ingredients.append(key)
    return ingredients

def cocktails_inverse(recipes, B):
    inverse = {}

    for key1, value1 in recipes.items():
        for key2, value2 in value1.items():
            if key2 == "ingredients":
                for key3, value3 in value2.items():
                    key = normalizeString(key3, B)
                    # neues ingredient -> rezepten liste initialisieren
                    if key not in inverse:
                        inverse[key] = []
                    # unbekannt ob rezepte mehrfach vorhanden sind
                    if key1 not in inverse[key]:
                        inverse[key].append(key1)
    return inverse

def cocktails_inverse_inverse(inverse_recipes):
    invert = {}

    for key1, value1 in inverse_recipes.items():
        for value2 in value1:
            if value2 not in invert:
                invert[value2] = [key1]
            else:
                invert[value2].append(key1)
    return invert

def possible_cocktails(inverse_recipes, available_ingredients):
    candidates = []
    invalid = []
    total = []

    # Beschränke die Liste auf Cocktails welche mindestens eins der
    # verfügbaren Ingrediente benötigen
    for key1 in available_ingredients:
        for cocktail in inverse_recipes[key1]:
            # Garantiert eindeutige Einträge in candidates[]
            if cocktail not in candidates:
                candidates.append(cocktail)

    # Iteriere nun über alle Ingrediente, die _nicht_ verfügbar sind
    for key2, value2 in inverse_recipes.items():
        if key2 not in available_ingredients:
            for candidate in candidates:
                # Ein Kandidat ist ungültig, wenn er ein anderes Ingredient
                # als die Verfügbaren benötigt.
                if candidate in value2:
                    if candidate not in invalid:
                        invalid.append(candidate)

    for candidate in candidates:
        if candidate not in invalid:
            total.append(candidate)
    return total

def possible_cocktails_fast(inverse_recipes, inverse2_recipes, available_ingredients):
    candidates = []
    total = []

    for key1 in available_ingredients:
        for cocktail in inverse_recipes[key1]:
            if cocktail not in candidates:
                candidates.append(cocktail)

    for cocktail in candidates:
        isCraftable = True
        for value2 in inverse2_recipes[cocktail]:
            if value2 not in available_ingredients:
                isCraftable = False
                break
        if isCraftable:
            total.append(cocktail)
    return total
            
            
def randomize_available(inverse, n):
    available = []
    secure_random = random.SystemRandom()

    for i in range(0, n):
        available.append(secure_random.choice(inverse))
    return available

def optimal_ingredients(inverse_recipes):
    counter = 0
    counter_max = 0
    possible_max = []
    ingredients = list(inverse_recipes.keys())
    ingredients_max = []
    
    while counter < 20000:
        if not counter % 500:
            print(counter)
        available_ingredients = randomize_available(ingredients, 5)
        possible = possible_cocktails(
            inverse_recipes, available_ingredients)
        if len(possible) > len(possible_max):
            possible_max = possible
            ingredients_max = available_ingredients
            counter_max = counter
        counter = counter + 1
    print(counter_max, ingredients_max, possible_max)

def optimal_ingredients_fast(inverse_recipes, inverse2_recipes):
    counter = 0
    counter_max = 0
    possible_max = []
    ingredients = list(inverse_recipes.keys())
    ingredients_max = []
    
    while counter < 1000000:
        if not counter % 500:
            print(counter)
        available_ingredients = randomize_available(ingredients, 5)
        possible = possible_cocktails_fast(
            inverse_recipes, inverse2_recipes, available_ingredients)
        if len(possible) > len(possible_max):
            possible_max = possible
            ingredients_max = available_ingredients
            counter_max = counter
        counter = counter + 1
    print(counter_max, ingredients_max, possible_max)

def main():
    recipes = json.load(open('cocktails.json', 'r', encoding="utf-8")) # dict
    
    ingredients_orig = all_ingredients(recipes, False)
    ingredients = all_ingredients(recipes, True)
    ingredients_file = open('ingredients.json', 'w', encoding="utf-8")
    json.dump(ingredients, ingredients_file, indent=4, ensure_ascii=False)
    
    inverse_recipes = cocktails_inverse(recipes, True)
    inverse_file = open('cocktails_inverse.json', 'w', encoding="utf-8")
    json.dump(inverse_recipes, inverse_file, indent=4, ensure_ascii=False)
   
    print("Anzahl an Ingredienten (mit Redundanz)", len(ingredients_orig))
    print("Anzahl an Ingredienten", len(ingredients))
    print("Anzahl an Rezepten", len(list(recipes.keys())))
    
    # Entferne alle Rezepte mit Ingredienten die nicht von anderen Rezepten
    # geteilt werden.
    for key, value in inverse_recipes.items():
        if len(value) < 5:
            for i in value:
                if i in recipes:
                    del recipes[i]

    # Berechne invertierte liste erneut
    ingredients = all_ingredients(recipes, True)
    inverse_recipes = cocktails_inverse(recipes, True)

    # Entferne jegliche Ingredienten, die sich in ignore_list befinden
    to_remove = []
    for key in inverse_recipes.keys():
        if key in ignore_list:
            to_remove.append(key)
    for key in to_remove:
        del inverse_recipes[key]

    inverse2_recipes = cocktails_inverse_inverse(inverse_recipes)
    inverse2_file = open('cocktails_inverse_2.json', 'w', encoding="utf-8")
    json.dump(inverse2_recipes, inverse2_file, indent=4)

    filtered_file = open('cocktails_filtered.json', 'w', encoding="utf-8")
    json.dump(recipes, filtered_file, indent=4, ensure_ascii=False)
    
    print("Anzahl an Ingredienten (gefiltert)", len(ingredients))
    print("Anzahl an Rezepten (gefiltert)", len(list(recipes.keys())))

##    optimal_ingredients(inverse_recipes)
    optimal_ingredients_fast(inverse_recipes, inverse2_recipes)
    
if __name__ == "__main__":
    main()
