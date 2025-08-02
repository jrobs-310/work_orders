import React, { useState, useMemo } from 'react';
import "./tailwind.css"
import {DATA} from "./data.ts";

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
// declare global {
//     interface Window {
//         fs?: {
//             readFile: (path: string, options?: { encoding?: string }) => Promise<any>;
//         };
//     }
// }

const BuildingMaintenanceHeatMap: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('leaks');
    const [selectedYear, setSelectedYear] = useState<YearFilter>('all');

    // Process the raw data from the file
    const processedData = useMemo((): ProcessedData[] => {
        const data: MaintenanceRecord[] = DATA;

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
