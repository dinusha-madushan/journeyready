"""Selenium smoke test. Start the app first (npm run dev), then run:
    pip install selenium
    python tests/smoke_test.py
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE = "http://localhost:3000"
driver = webdriver.Chrome()
wait = WebDriverWait(driver, 15)
try:
    driver.get(BASE)
    assert "JourneyReady" in driver.title, "Title is wrong"

    for path, heading in [("/explore", "Explore Sri Lanka"), ("/weather", "Weather forecast"), ("/near", "Near me"), ("/routes", "Routes"),
                          ("/trip", "Itinerary planner"), ("/packing", "Smart packing list"),
                          ("/budget", "Budget planner"), ("/alerts", "Travel alerts")]:
        driver.get(BASE + path)
        wait.until(EC.text_to_be_present_in_element((By.TAG_NAME, "h1"), heading))
        print("OK", path)

    # Budget: add an expense and check it shows up
    driver.get(BASE + "/budget")
    driver.find_element(By.CSS_SELECTOR, "[aria-label='Expense name']").send_keys("Tuk tuk")
    driver.find_element(By.CSS_SELECTOR, "[aria-label='Amount']").send_keys("1500")
    driver.find_element(By.XPATH, "//button[text()='Add']").click()
    wait.until(EC.text_to_be_present_in_element((By.TAG_NAME, "main"), "Tuk tuk"))
    print("OK budget add expense")

    # Itinerary: empty input shows an error message
    driver.get(BASE + "/trip")
    driver.find_element(By.XPATH, "//button[text()='Add']").click()
    wait.until(EC.text_to_be_present_in_element((By.TAG_NAME, "main"), "Write an activity"))
    print("OK trip validation")
    print("ALL TESTS PASSED")
finally:
    driver.quit()
