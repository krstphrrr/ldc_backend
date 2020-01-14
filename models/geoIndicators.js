/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('geoIndicators', {
		ogcFid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ogc_fid'
		},
		ahAnnGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_AnnGrassCover'
		},
		ahForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_ForbCover'
		},
		ahGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_GrassCover'
		},
		ahNonNoxAnnForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxAnnForbCover'
		},
		ahNonNoxAnnForbGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxAnnForbGrassCover'
		},
		ahNonNoxAnnGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxAnnGrassCover'
		},
		ahNonNoxCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxCover'
		},
		ahNonNoxPerenForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxPerenForbCover'
		},
		ahNonNoxPerenForbGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxPerenForbGrassCover'
		},
		ahNonNoxPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxPerenGrassCover'
		},
		ahNonNoxShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxShrubCover'
		},
		ahNonNoxSubShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxSubShrubCover'
		},
		ahNonNoxSucculentCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxSucculentCover'
		},
		ahNonNoxTreeCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxTreeCover'
		},
		ahNonSagebrushShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NonSagebrushShrubCover'
		},
		ahNoxAnnForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxAnnForbCover'
		},
		ahNoxAnnForbGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxAnnForbGrassCover'
		},
		ahNoxAnnGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxAnnGrassCover'
		},
		ahNoxCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxCover'
		},
		ahNoxPerenForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxPerenForbCover'
		},
		ahNoxPerenForbGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxPerenForbGrassCover'
		},
		ahNoxPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxPerenGrassCover'
		},
		ahNoxShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxShrubCover'
		},
		ahNoxSubShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxSubShrubCover'
		},
		ahNoxSucculentCover: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'AH_NoxSucculentCover'
		},
		ahNoxTreeCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_NoxTreeCover'
		},
		ahPerenForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_PerenForbCover'
		},
		ahPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_PerenGrassCover'
		},
		ahPerenGrassForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_PerenGrassForbCover'
		},
		ahPreferredForb: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_PreferredForb'
		},
		ahPreferredForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_PreferredForbCover'
		},
		ahSagebrushCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_SagebrushCover'
		},
		ahSagebrushCoverLive: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_SagebrushCover_Live'
		},
		ahShortPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_ShortPerenGrassCover'
		},
		ahShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_ShrubCover'
		},
		ahTallPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AH_TallPerenGrassCover'
		},
		bareSoilCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'BareSoilCover'
		},
		county: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'County'
		},
		dbKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DBKey'
		},
		dateEstablished: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DateEstablished'
		},
		dateLoadedInDb: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DateLoadedInDb'
		},
		dateVisited: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DateVisited'
		},
		elevation: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'ELEVATION'
		},
		ecolSiteName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'EcolSiteName'
		},
		ecologicalSiteId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'EcologicalSiteId'
		},
		fhCyanobacteriaCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_CyanobacteriaCover'
		},
		fhDepSoilCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_DepSoilCover'
		},
		fhDuffCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_DuffCover'
		},
		fhEmbLitterCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_EmbLitterCover'
		},
		fhHerbLitterCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_HerbLitterCover'
		},
		fhLichenCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_LichenCover'
		},
		fhMossCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_MossCover'
		},
		fhNonNoxAnnForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxAnnForbCover'
		},
		fhNonNoxAnnGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxAnnGrassCover'
		},
		fhNonNoxPerenForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxPerenForbCover'
		},
		fhNonNoxPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxPerenGrassCover'
		},
		fhNonNoxShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxShrubCover'
		},
		fhNonNoxSubShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxSubShrubCover'
		},
		fhNonNoxSucculentCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxSucculentCover'
		},
		fhNonNoxTreeCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxTreeCover'
		},
		fhNoxAnnForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxAnnForbCover'
		},
		fhNoxAnnGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxAnnGrassCover'
		},
		fhNoxPerenForbCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxPerenForbCover'
		},
		fhNoxPerenGrassCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxPerenGrassCover'
		},
		fhNoxShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxShrubCover'
		},
		fhNoxSubShrubCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxSubShrubCover'
		},
		fhNoxSucculentCover: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'FH_NoxSucculentCover'
		},
		fhNoxTreeCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_NoxTreeCover'
		},
		fhRockCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_RockCover'
		},
		fhSagebrushCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_SagebrushCover'
		},
		fhTotalLitterCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_TotalLitterCover'
		},
		fhVagrLichenCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_VagrLichenCover'
		},
		fhWaterCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_WaterCover'
		},
		fhWoodyLitterCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'FH_WoodyLitterCover'
		},
		gapCover101200: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapCover_101_200'
		},
		gapCover200Plus: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapCover_200_plus'
		},
		gapCover2550: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapCover_25_50'
		},
		gapCover25Plus: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapCover_25_plus'
		},
		gapCover51100: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapCover_51_100'
		},
		globalId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'GlobalID'
		},
		hgtForbAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Forb_Avg'
		},
		hgtGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Grass_Avg'
		},
		hgtHerbaceousAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Herbaceous_Avg'
		},
		hgtNonNoxPerenGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_NonNoxPerenGrass_Avg'
		},
		hgtNonSagebrushShrubAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_NonSagebrushShrub_Avg'
		},
		hgtNoxPerenGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_NoxPerenGrass_Avg'
		},
		hgtPerenForbGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_PerenForbGrass_Avg'
		},
		hgtPerenForbAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_PerenForb_Avg'
		},
		hgtPerenGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_PerenGrass_Avg'
		},
		hgtSagebrushAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Sagebrush_Avg'
		},
		hgtSagebrushLiveAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Sagebrush_Live_Avg'
		},
		hgtShortPerenGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_ShortPerenGrass_Avg'
		},
		hgtTallPerenGrassAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_TallPerenGrass_Avg'
		},
		hgtWoodyAvg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hgt_Woody_Avg'
		},
		latitudeNad83: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'latitude_nad83'
		},
		locationType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'LocationType'
		},
		longitudeNad83: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Longitude_NAD83'
		},
		numSppNonNoxPlant: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NumSpp_NonNoxPlant'
		},
		numSppNoxPlant: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NumSpp_NoxPlant'
		},
		numSppPreferredForb: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NumSpp_PreferredForb'
		},
		plotkey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PLOTKEY'
		},
		percentCoveredByEcoSite: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'PercentCoveredByEcoSite'
		},
		plotId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PlotID'
		},
		plotkey2: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'plotkey2'
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
		projectName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ProjectName'
		},
		rhAnnualProd: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_AnnualProd'
		},
		rhBareGround: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_BareGround'
		},
		rhBioticIntegrity: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_BioticIntegrity'
		},
		rhCommentsBi: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_CommentsBI'
		},
		rhCommentsHf: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_CommentsHF'
		},
		rhCommentsSs: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_CommentsSS'
		},
		rhCompaction: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_Compaction'
		},
		rhDeadDyingPlantParts: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_DeadDyingPlantParts'
		},
		rhFuncSructGroup: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_FuncSructGroup'
		},
		rhGullies: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_Gullies'
		},
		rhHydrologicFunction: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_HydrologicFunction'
		},
		rhInvasivePlants: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_InvasivePlants'
		},
		rhLitterAmount: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_LitterAmount'
		},
		rhLitterMovement: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_LitterMovement'
		},
		rhPedestalsTerracettes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_PedestalsTerracettes'
		},
		rhPlantCommunityComp: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_PlantCommunityComp'
		},
		rhReprodCapabilityPeren: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_ReprodCapabilityPeren'
		},
		rhRills: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_Rills'
		},
		rhSoilSiteStability: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_SoilSiteStability'
		},
		rhSoilSurfLossDeg: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_SoilSurfLossDeg'
		},
		rhSoilSurfResisErosion: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_SoilSurfResisErosion'
		},
		rhWaterFlowPatterns: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_WaterFlowPatterns'
		},
		rhWindScouredAreas: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RH_WindScouredAreas'
		},
		recordCount: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RecordCount'
		},
		sagebrushShapeAllColumnCount: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_All_ColumnCount'
		},
		sagebrushShapeAllPredominant: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SagebrushShape_All_Predominant'
		},
		sagebrushShapeAllSpreadCount: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_All_SpreadCount'
		},
		sagebrushShapeLiveColumnCount: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_Live_ColumnCount'
		},
		sagebrushShapeLivePredominant: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SagebrushShape_Live_Predominant'
		},
		sagebrushShapeLiveSpreadCount: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_Live_SpreadCount'
		},
		soilStabilityAll: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SoilStability_All'
		},
		soilStabilityProtected: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SoilStability_Protected'
		},
		soilStabilityUnprotected: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SoilStability_Unprotected'
		},
		sppNox: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Spp_Nox'
		},
		sppPreferredForb: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Spp_PreferredForb'
		},
		sppSagebrush: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Spp_Sagebrush'
		},
		sppShortPerenGrass: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Spp_ShortPerenGrass'
		},
		sppTallPerenGrass: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Spp_TallPerenGrass'
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'State'
		},
		totalFoliarCover: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'TotalFoliarCover'
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
		public: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'Public'
		}
	}, {
		tableName: 'geoIndicators'
	});
};
