/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('geoSpecies', {
		ogcFid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ogc_fid'
		},
		ahSpeciesCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_SpeciesCover'
		},
		ahSpeciesCoverN: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_SpeciesCover_n'
		},
		dbKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DBKey'
		},
		duration: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Duration'
		},
		globalId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'GlobalID'
		},
		growthHabit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'GrowthHabit'
		},
		growthHabitSub: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'GrowthHabitSub'
		},
		hgtSpeciesAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Species_Avg'
		},
		hgtSpeciesAvgN: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Species_Avg_n'
		},
		latitudeNad83: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'latitude_nad83'
		},
		longitudeNad83: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Longitude_NAD83'
		},
		noxious: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Noxious'
		},
		plotId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PlotID'
		},
		primaryKey: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'dataHeader',
				key: 'PrimaryKey'
			},
			field: 'PrimaryKey'
		},
		sgGroup: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SG_Group'
		},
		species: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Species'
		},
		speciesState: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SpeciesState'
		},
		createdDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'created_date'
		},
		createdUser: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'created_user'
		},
		lastEditedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'last_edited_date'
		},
		lastEditedUser: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'last_edited_user'
		},
		wkbGeometry: {
			type: DataTypes.ENUM(),
			allowNull: true,
			field: 'wkb_geometry'
		},
		dateLoadedInDb: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateLoadedInDb'
		},
		public: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'Public'
		}
	}, {
		tableName: 'geoSpecies'
	});
};
