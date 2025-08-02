import React, { useState, useMemo } from 'react';
import "./tailwind.css"

// Type definitions
interface MaintenanceRecord {
    floor: number;
    room: number;
    year: string;
    leaks: number;
    drywall: number;
}

interface ProcessedData {
    floor: number;
    room: number;
    leaks: number;
    drywall: number;
}

type MetricType = 'leaks' | 'drywall';
type YearFilter = 'all' | '2020' | '2021' | '2022' | '2023' | '2024';

// Extend Window interface to include fs property
declare global {
    interface Window {
        fs?: {
            readFile: (path: string, options?: { encoding?: string }) => Promise<any>;
        };
    }
}

const BuildingMaintenanceHeatMap: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('leaks');
    const [selectedYear, setSelectedYear] = useState<YearFilter>('all');

    // Process the raw data from the file
    const processedData = useMemo((): ProcessedData[] => {
        const data: MaintenanceRecord[] = window.fs ? [] : [
            {"floor": 33, "room": "35", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "35", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 33, "room": "35", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 33, "room": "35", "year": "2024", "leaks": 7, "drywall": 3},
            {"floor": 33, "room": "36", "year": "2021", "leaks": 1, "drywall": 3},
            {"floor": 33, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "36", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 33, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "37", "year": "2020", "leaks": 2, "drywall": 0},
            {"floor": 33, "room": "37", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "37", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "37", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 33, "room": "37", "year": "2024", "leaks": 1, "drywall": 1},
            {"floor": 33, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "38", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 33, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "38", "year": "2023", "leaks": 4, "drywall": 1},
            {"floor": 33, "room": "38", "year": "2024", "leaks": 3, "drywall": 1},
            {"floor": 33, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "40", "year": "2022", "leaks": 4, "drywall": 6},
            {"floor": 33, "room": "40", "year": "2023", "leaks": 5, "drywall": 3},
            {"floor": 33, "room": "40", "year": "2024", "leaks": 4, "drywall": 2},
            {"floor": 33, "room": "42", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 33, "room": "42", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 33, "room": "42", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 33, "room": "42", "year": "2024", "leaks": 3, "drywall": 1},
            {"floor": 32, "room": "35", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 32, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "35", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 32, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "36", "year": "2023", "leaks": 3, "drywall": 0},
            {"floor": 32, "room": "37", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 32, "room": "37", "year": "2022", "leaks": 3, "drywall": 0},
            {"floor": 32, "room": "37", "year": "2023", "leaks": 3, "drywall": 2},
            {"floor": 32, "room": "37", "year": "2024", "leaks": 7, "drywall": 0},
            {"floor": 32, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "38", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 32, "room": "38", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 32, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "40", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 32, "room": "40", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 32, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "42", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 32, "room": "42", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 32, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "35", "year": "2021", "leaks": 5, "drywall": 1},
            {"floor": 31, "room": "35", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 31, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "35", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 31, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "36", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 31, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "36", "year": "2023", "leaks": 1, "drywall": 2},
            {"floor": 31, "room": "36", "year": "2024", "leaks": 8, "drywall": 0},
            {"floor": 31, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "37", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 31, "room": "37", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 31, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "38", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 31, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "38", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 31, "room": "38", "year": "2023", "leaks": 1, "drywall": 3},
            {"floor": 31, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "40", "year": "2020", "leaks": 2, "drywall": 0},
            {"floor": 31, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "40", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 31, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "42", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "42", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 31, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "35", "year": "2021", "leaks": 3, "drywall": 1},
            {"floor": 30, "room": "35", "year": "2022", "leaks": 1, "drywall": 2},
            {"floor": 30, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "35", "year": "2024", "leaks": 3, "drywall": 1},
            {"floor": 30, "room": "36", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 30, "room": "36", "year": "2021", "leaks": 1, "drywall": 1},
            {"floor": 30, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "36", "year": "2024", "leaks": 4, "drywall": 4},
            {"floor": 30, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "37", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 30, "room": "37", "year": "2022", "leaks": 4, "drywall": 0},
            {"floor": 30, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "37", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 30, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "38", "year": "2023", "leaks": 2, "drywall": 1},
            {"floor": 30, "room": "38", "year": "2024", "leaks": 3, "drywall": 1},
            {"floor": 30, "room": "39", "year": "2021", "leaks": 0, "drywall": 1},
            {"floor": 30, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "39", "year": "2023", "leaks": 3, "drywall": 0},
            {"floor": 30, "room": "39", "year": "2024", "leaks": 2, "drywall": 0},
            {"floor": 30, "room": "40", "year": "2020", "leaks": 0, "drywall": 1},
            {"floor": 30, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "40", "year": "2023", "leaks": 5, "drywall": 2},
            {"floor": 30, "room": "40", "year": "2024", "leaks": 3, "drywall": 0},
            {"floor": 30, "room": "42", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "42", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 30, "room": "42", "year": "2023", "leaks": 2, "drywall": 2},
            {"floor": 30, "room": "42", "year": "2024", "leaks": 2, "drywall": 0},
            {"floor": 29, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "35", "year": "2021", "leaks": 1, "drywall": 1},
            {"floor": 29, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "37", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 29, "room": "37", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "37", "year": "2023", "leaks": 1, "drywall": 2},
            {"floor": 29, "room": "37", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 29, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "38", "year": "2021", "leaks": 3, "drywall": 2},
            {"floor": 29, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "38", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 29, "room": "39", "year": "2020", "leaks": 3, "drywall": 0},
            {"floor": 29, "room": "39", "year": "2021", "leaks": 1, "drywall": 2},
            {"floor": 29, "room": "39", "year": "2022", "leaks": 2, "drywall": 2},
            {"floor": 29, "room": "39", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 29, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 29, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "40", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 29, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 29, "room": "42", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 29, "room": "42", "year": "2023", "leaks": 2, "drywall": 1},
            {"floor": 29, "room": "42", "year": "2024", "leaks": 3, "drywall": 2},
            {"floor": 28, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "35", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 28, "room": "35", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 28, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "36", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 28, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "37", "year": "2020", "leaks": 3, "drywall": 0},
            {"floor": 28, "room": "37", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 28, "room": "37", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "38", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 28, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "38", "year": "2023", "leaks": 1, "drywall": 2},
            {"floor": 28, "room": "39", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 28, "room": "39", "year": "2022", "leaks": 4, "drywall": 2},
            {"floor": 28, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "40", "year": "2021", "leaks": 3, "drywall": 1},
            {"floor": 28, "room": "40", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 28, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "42", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "42", "year": "2021", "leaks": 3, "drywall": 1},
            {"floor": 28, "room": "42", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 28, "room": "42", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 28, "room": "42", "year": "2024", "leaks": 5, "drywall": 0},
            {"floor": 27, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "35", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 27, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "35", "year": "2023", "leaks": 7, "drywall": 0},
            {"floor": 27, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "36", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 27, "room": "36", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 27, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "36", "year": "2023", "leaks": 2, "drywall": 2},
            {"floor": 27, "room": "36", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 27, "room": "37", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 27, "room": "37", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 27, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "39", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 27, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "40", "year": "2021", "leaks": 4, "drywall": 3},
            {"floor": 27, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 27, "room": "40", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 27, "room": "42", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 27, "room": "42", "year": "2022", "leaks": 1, "drywall": 2},
            {"floor": 27, "room": "42", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 27, "room": "42", "year": "2024", "leaks": 1, "drywall": 1},
            {"floor": 26, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "35", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 26, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "36", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 26, "room": "36", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 26, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "37", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 26, "room": "37", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "38", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 26, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "38", "year": "2023", "leaks": 2, "drywall": 0},
            {"floor": 26, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "39", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 26, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "40", "year": "2021", "leaks": 0, "drywall": 1},
            {"floor": 26, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "42", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "42", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 26, "room": "42", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 26, "room": "42", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 26, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "35", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "35", "year": "2022", "leaks": 4, "drywall": 0},
            {"floor": 25, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "36", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 25, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "36", "year": "2024", "leaks": 3, "drywall": 0},
            {"floor": 25, "room": "37", "year": "2020", "leaks": 2, "drywall": 0},
            {"floor": 25, "room": "37", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 25, "room": "37", "year": "2022", "leaks": 3, "drywall": 4},
            {"floor": 25, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "38", "year": "2020", "leaks": 0, "drywall": 1},
            {"floor": 25, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "38", "year": "2022", "leaks": 1, "drywall": 4},
            {"floor": 25, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "39", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 25, "room": "39", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "39", "year": "2022", "leaks": 4, "drywall": 0},
            {"floor": 25, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "40", "year": "2020", "leaks": 3, "drywall": 1},
            {"floor": 25, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "40", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 25, "room": "40", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 25, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "42", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 25, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 25, "room": "42", "year": "2022", "leaks": 0, "drywall": 2},
            {"floor": 25, "room": "42", "year": "2023", "leaks": 2, "drywall": 1},
            {"floor": 25, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "46", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "35", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "35", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 24, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "37", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "37", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "37", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "38", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "38", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "39", "year": "2020", "leaks": 2, "drywall": 0},
            {"floor": 24, "room": "39", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "39", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 24, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "40", "year": "2020", "leaks": 2, "drywall": 1},
            {"floor": 24, "room": "40", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 24, "room": "42", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "42", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "42", "year": "2022", "leaks": 2, "drywall": 0},
            {"floor": 24, "room": "42", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 24, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "35", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "35", "year": "2023", "leaks": 2, "drywall": 0},
            {"floor": 23, "room": "35", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "36", "year": "2021", "leaks": 1, "drywall": 1},
            {"floor": 23, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "36", "year": "2023", "leaks": 3, "drywall": 0},
            {"floor": 23, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "37", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "37", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 23, "room": "37", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "37", "year": "2023", "leaks": 2, "drywall": 1},
            {"floor": 23, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "38", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "38", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 23, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "39", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "39", "year": "2021", "leaks": 4, "drywall": 3},
            {"floor": 23, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "40", "year": "2020", "leaks": 4, "drywall": 0},
            {"floor": 23, "room": "40", "year": "2021", "leaks": 4, "drywall": 1},
            {"floor": 23, "room": "40", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "40", "year": "2023", "leaks": 1, "drywall": 1},
            {"floor": 23, "room": "40", "year": "2024", "leaks": 1, "drywall": 1},
            {"floor": 23, "room": "42", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "42", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 23, "room": "42", "year": "2022", "leaks": 2, "drywall": 1},
            {"floor": 23, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 23, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "35", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 22, "room": "35", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 22, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "36", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 22, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "37", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 22, "room": "37", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 22, "room": "37", "year": "2022", "leaks": 1, "drywall": 2},
            {"floor": 22, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "37", "year": "2024", "leaks": 3, "drywall": 0},
            {"floor": 22, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "38", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 22, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "39", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "39", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 22, "room": "39", "year": "2023", "leaks": 2, "drywall": 2},
            {"floor": 22, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "40", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 22, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "40", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 22, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "40", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 22, "room": "42", "year": "2020", "leaks": 0, "drywall": 2},
            {"floor": 22, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "42", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 22, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 22, "room": "42", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 21, "room": "35", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 21, "room": "35", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "35", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 21, "room": "35", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 21, "room": "36", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 21, "room": "36", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 21, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "37", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 21, "room": "37", "year": "2022", "leaks": 3, "drywall": 2},
            {"floor": 21, "room": "37", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 21, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "38", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 21, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "39", "year": "2021", "leaks": 4, "drywall": 0},
            {"floor": 21, "room": "39", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 21, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "40", "year": "2021", "leaks": 1, "drywall": 1},
            {"floor": 21, "room": "40", "year": "2022", "leaks": 1, "drywall": 2},
            {"floor": 21, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "40", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 21, "room": "42", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 21, "room": "42", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 21, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "35", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "35", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 20, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "36", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 20, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "37", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "37", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "37", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "37", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "38", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 20, "room": "38", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "38", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "39", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "40", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "40", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "42", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "42", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 20, "room": "42", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 20, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 20, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "35", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "35", "year": "2022", "leaks": 1, "drywall": 2},
            {"floor": 19, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "36", "year": "2021", "leaks": 3, "drywall": 0},
            {"floor": 19, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "37", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 19, "room": "37", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "37", "year": "2022", "leaks": 2, "drywall": 1},
            {"floor": 19, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "38", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 19, "room": "38", "year": "2022", "leaks": 1, "drywall": 3},
            {"floor": 19, "room": "38", "year": "2023", "leaks": 2, "drywall": 0},
            {"floor": 19, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "39", "year": "2021", "leaks": 7, "drywall": 2},
            {"floor": 19, "room": "39", "year": "2022", "leaks": 2, "drywall": 4},
            {"floor": 19, "room": "39", "year": "2023", "leaks": 4, "drywall": 1},
            {"floor": 19, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 19, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "40", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "40", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "40", "year": "2023", "leaks": 3, "drywall": 1},
            {"floor": 19, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 19, "room": "42", "year": "2021", "leaks": 2, "drywall": 2},
            {"floor": 19, "room": "42", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 19, "room": "42", "year": "2023", "leaks": 4, "drywall": 0},
            {"floor": 19, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "35", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "35", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 18, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "35", "year": "2023", "leaks": 2, "drywall": 0},
            {"floor": 18, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "36", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "36", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 18, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "37", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "37", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 18, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "39", "year": "2020", "leaks": 0, "drywall": 1},
            {"floor": 18, "room": "39", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 18, "room": "39", "year": "2022", "leaks": 2, "drywall": 1},
            {"floor": 18, "room": "39", "year": "2023", "leaks": 2, "drywall": 1},
            {"floor": 18, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "40", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 18, "room": "40", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 18, "room": "40", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 18, "room": "40", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 18, "room": "40", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "42", "year": "2021", "leaks": 0, "drywall": 1},
            {"floor": 18, "room": "42", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 18, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 18, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "35", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "35", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "35", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 17, "room": "35", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "35", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "36", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "37", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "37", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "37", "year": "2023", "leaks": 2, "drywall": 0},
            {"floor": 17, "room": "37", "year": "2024", "leaks": 1, "drywall": 1},
            {"floor": 17, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "38", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "38", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 17, "room": "38", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "38", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "39", "year": "2020", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "39", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "39", "year": "2022", "leaks": 2, "drywall": 1},
            {"floor": 17, "room": "39", "year": "2023", "leaks": 3, "drywall": 2},
            {"floor": 17, "room": "39", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 17, "room": "40", "year": "2021", "leaks": 4, "drywall": 0},
            {"floor": 17, "room": "40", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 17, "room": "40", "year": "2023", "leaks": 6, "drywall": 4},
            {"floor": 17, "room": "40", "year": "2024", "leaks": 3, "drywall": 1},
            {"floor": 17, "room": "42", "year": "2021", "leaks": 2, "drywall": 1},
            {"floor": 17, "room": "42", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "42", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 17, "room": "42", "year": "2024", "leaks": 4, "drywall": 2},
            {"floor": 16, "room": "35", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 16, "room": "35", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "35", "year": "2023", "leaks": 5, "drywall": 0},
            {"floor": 16, "room": "35", "year": "2024", "leaks": 1, "drywall": 0},
            {"floor": 16, "room": "36", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "36", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 16, "room": "36", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "36", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "36", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "37", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "37", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 16, "room": "37", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 16, "room": "37", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "37", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "38", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "38", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "38", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 16, "room": "38", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 16, "room": "38", "year": "2024", "leaks": 2, "drywall": 0},
            {"floor": 16, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "39", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 16, "room": "39", "year": "2022", "leaks": 2, "drywall": 1},
            {"floor": 16, "room": "39", "year": "2023", "leaks": 2, "drywall": 2},
            {"floor": 16, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "40", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "40", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 16, "room": "40", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 16, "room": "40", "year": "2023", "leaks": 2, "drywall": 0},
            {"floor": 16, "room": "40", "year": "2024", "leaks": 3, "drywall": 0},
            {"floor": 16, "room": "42", "year": "2021", "leaks": 0, "drywall": 1},
            {"floor": 16, "room": "42", "year": "2022", "leaks": 5, "drywall": 1},
            {"floor": 16, "room": "42", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 16, "room": "42", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 15, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 15, "room": "39", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 15, "room": "39", "year": "2022", "leaks": 2, "drywall": 0},
            {"floor": 15, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 15, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 14, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 14, "room": "39", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 14, "room": "39", "year": "2022", "leaks": 5, "drywall": 0},
            {"floor": 14, "room": "39", "year": "2023", "leaks": 4, "drywall": 2},
            {"floor": 12, "room": "39", "year": "2021", "leaks": 1, "drywall": 0},
            {"floor": 12, "room": "39", "year": "2022", "leaks": 1, "drywall": 0},
            {"floor": 12, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 12, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 11, "room": "39", "year": "2021", "leaks": 3, "drywall": 1},
            {"floor": 11, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 11, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 11, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 10, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 10, "room": "39", "year": "2021", "leaks": 1, "drywall": 1},
            {"floor": 10, "room": "39", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 10, "room": "39", "year": "2023", "leaks": 4, "drywall": 0},
            {"floor": 10, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 9, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 9, "room": "39", "year": "2021", "leaks": 2, "drywall": 3},
            {"floor": 9, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 9, "room": "39", "year": "2023", "leaks": 3, "drywall": 2},
            {"floor": 9, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 8, "room": "39", "year": "2021", "leaks": 0, "drywall": 0},
            {"floor": 8, "room": "39", "year": "2022", "leaks": 0, "drywall": 1},
            {"floor": 8, "room": "39", "year": "2023", "leaks": 0, "drywall": 1},
            {"floor": 8, "room": "39", "year": "2024", "leaks": 0, "drywall": 2},
            {"floor": 7, "room": "39", "year": "2021", "leaks": 1, "drywall": 3},
            {"floor": 7, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 7, "room": "39", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 7, "room": "39", "year": "2024", "leaks": 2, "drywall": 0},
            {"floor": 6, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 6, "room": "39", "year": "2021", "leaks": 1, "drywall": 2},
            {"floor": 6, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 6, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 6, "room": "39", "year": "2024", "leaks": 4, "drywall": 1},
            {"floor": 5, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 5, "room": "39", "year": "2021", "leaks": 3, "drywall": 1},
            {"floor": 5, "room": "39", "year": "2022", "leaks": 1, "drywall": 1},
            {"floor": 5, "room": "39", "year": "2023", "leaks": 1, "drywall": 0},
            {"floor": 5, "room": "39", "year": "2024", "leaks": 4, "drywall": 2},
            {"floor": 4, "room": "39", "year": "2020", "leaks": 0, "drywall": 0},
            {"floor": 4, "room": "39", "year": "2021", "leaks": 2, "drywall": 0},
            {"floor": 4, "room": "39", "year": "2022", "leaks": 0, "drywall": 0},
            {"floor": 4, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 4, "room": "39", "year": "2024", "leaks": 0, "drywall": 0},
            {"floor": 3, "room": "39", "year": "2021", "leaks": 5, "drywall": 2},
            {"floor": 3, "room": "39", "year": "2022", "leaks": 4, "drywall": 3},
            {"floor": 3, "room": "39", "year": "2023", "leaks": 0, "drywall": 0},
            {"floor": 3, "room": "39", "year": "2024", "leaks": 0, "drywall": 0}
        ];

        // Group data by floor and room, summing values
        const groupedData: Record<string, ProcessedData> = {};

        data?.forEach((record: MaintenanceRecord) => {
            if (selectedYear !== 'all' && record.year !== selectedYear) return;

            const key = `${record.floor}-${record.room}`;
            if (!groupedData[key]) {
                groupedData[key] = {
                    floor: record.floor,
                    room: record.room,
                    leaks: 0,
                    drywall: 0
                };
            }
            groupedData[key].leaks += record.leaks;
            groupedData[key].drywall += record.drywall;
        });

        return Object.values(groupedData);
    }, [selectedYear]);

    // Get unique floors and rooms for grid
    const floors: number[] = [...new Set(processedData.map(d => d.floor))];
    const rooms: number[] = [...new Set(processedData.map(d => d.room))];

    // Create a map for quick lookup
    const dataMap: Record<string, ProcessedData> = {};
    processedData.forEach((d: ProcessedData) => {
        dataMap[`${d.floor}-${d.room}`] = d;
    });

    // Get max value for color scaling
    const maxValue: number = Math.max(...processedData.map(d => d[selectedMetric]));

    // Color intensity function
    const getColorIntensity = (value: number): number => {
        if (value === 0) return 0;
        return Math.min(1, value / (maxValue || 1));
    };

    // Get color based on metric and intensity
    const getColor = (value: number): string => {
        const intensity = getColorIntensity(value);
        if (intensity === 0) return '#f8f9fa';

        if (selectedMetric === 'leaks') {
            const red = Math.floor(255 * (1 - intensity)); // From light red to dark red
            return `rgb(255, ${red}, ${red})`;
        } else {
            const blue = Math.floor(255 * (1 - intensity)); // From light blue to dark blue
            return `rgb(${blue}, ${blue}, 255)`;
        }
    };

    const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedMetric(e.target.value as MetricType);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedYear(e.target.value as YearFilter);
    };

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Building Maintenance Heat Map
                </h1>

                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-700">Metric:</label>
                        <select
                            value={selectedMetric}
                            onChange={handleMetricChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="leaks">Leaks</option>
                            <option value="drywall">Drywall Repairs</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-700">Year:</label>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Years</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4 flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">Intensity:</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Low</span>
                            <div className="flex">
                                {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity: number, i: number) => (
                                    <div
                                        key={i}
                                        className="w-6 h-4 border border-gray-300"
                                        style={{
                                            backgroundColor: selectedMetric === 'leaks'
                                                ? `rgb(255, ${Math.floor(255 * (1 - intensity))}, ${Math.floor(255 * (1 - intensity))})`
                                                : `rgb(${Math.floor(255 * (1 - intensity))}, ${Math.floor(255 * (1 - intensity))}, 255)`
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">High</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                            <div className="grid gap-1" style={{gridTemplateColumns: `60px repeat(${rooms.length}, 60px)`}}>
                                {/* Header row */}
                                <div className="h-6 flex items-center justify-center font-medium text-gray-700 text-sm">
                                    Room<br />Floor
                                </div>
                                {rooms.map((room: number) => (
                                    <div key={room} className="h-6 flex items-center justify-center font-medium text-gray-700 text-xs bg-gray-100 border">
                                        {room}
                                    </div>
                                ))}

                                {/* Data rows */}
                                {floors.map((floor: number) => (
                                    <React.Fragment key={floor}>
                                        <div className="h-6 flex items-center justify-center font-medium text-gray-700 text-sm bg-gray-100 border">
                                            {floor}
                                        </div>
                                        {rooms.map((room: number) => {
                                            const data: ProcessedData | undefined = dataMap[`${floor}-${room}`];
                                            const value: number = data ? data[selectedMetric] : 0;
                                            const white: boolean = selectedMetric !== 'leaks' && value > 5;
                                            return (
                                                <div
                                                    key={`${floor}-${room}`}
                                                    className="h-6 flex items-center justify-center text-xs font-medium border relative group cursor-pointer"
                                                    style={{backgroundColor: getColor(value)}}
                                                >
                                                    {value > 0 ? <span className={white ? "text-white" : ""}>{value}</span>: ''}
                                                    {data && (
                                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                                            Floor {floor}, Room {room}<br/>
                                                            Leaks: {data.leaks}<br/>
                                                            Drywall: {data.drywall}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Hover over cells to see detailed information. Higher values indicate more maintenance issues.</p>
                    <p className="mt-2">
            <span className="font-medium">
              {selectedMetric === 'leaks' ? 'Red intensity' : 'Blue intensity'}
            </span> shows the severity of {selectedMetric} issues.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuildingMaintenanceHeatMap;
