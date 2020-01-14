/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dataHeader', {
		primaryKey: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'PrimaryKey'
		},
		speciesState: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SpeciesState'
		},
		plotId: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'PlotID'
		},
		plotKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PlotKey'
		},
		dbKey: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'DBKey'
		},
		ecologicalSiteId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'EcologicalSiteId'
		},
		latitudeNad83: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Latitude_NAD83'
		},
		longitudeNad83: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Longitude_NAD83'
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'State'
		},
		county: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'County'
		},
		dateEstablished: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateEstablished'
		},
		projectName: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ProjectName'
		},
		source: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'source'
		},
		locationType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'LocationType'
		},
		dateVisited: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateVisited'
		},
		elevation: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Elevation'
		},
		percentCoveredByEcoSite: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'PercentCoveredByEcoSite'
		},
		dateLoadedInDb: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateLoadedInDb'
		}
	}, {
		tableName: 'dataHeader'
	});
};
