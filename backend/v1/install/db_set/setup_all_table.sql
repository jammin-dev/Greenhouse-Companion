-- Create the GardenArea table

CREATE TABLE
    garden_area (
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL UNIQUE,
        surface FLOAT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create the VegetableManager table

CREATE TABLE
    vegetable_manager (
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        quantity INTEGER NOT NULL,
        sowed BOOLEAN DEFAULT FALSE,
        planted BOOLEAN DEFAULT FALSE,
        sowing_date DATE,
        planting_date DATE,
        harvest_date DATE,
        remove_date DATE,
        harvest_quantity FLOAT,
        notes VARCHAR(1024),
        garden_area_id INTEGER REFERENCES garden_area(id),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create the VegetableInfos table

CREATE TABLE
    vegetable_infos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        family VARCHAR(20),
        start_indoor DATE,
        start_outdoor DATE,
    end DATE,
    water_needs INTEGER,
    cold_resistance INTEGER,
    spacing_on_raw INTEGER,
    spacing_between_raw INTEGER,
    description VARCHAR(250),
    plant_per_m2 FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the Sensors table

CREATE TABLE
    sensor (
        id SERIAL PRIMARY KEY,
        soil_humidity_1 INTEGER,
        soil_humidity_2 INTEGER,
        soil_humidity_3 INTEGER,
        air_temperature FLOAT,
        air_humidity FLOAT,
        luminosity FLOAT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );